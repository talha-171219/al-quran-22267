import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, List, Heart, Navigation, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { mosqueStorage, Mosque } from "@/utils/mosqueStorage";
import { useToast } from "@/hooks/use-toast";
import MosqueList from "@/components/mosque/MosqueList";
import MosqueDetails from "@/components/mosque/MosqueDetails";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MosqueFinder = () => {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [favorites, setFavorites] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadFavorites();
    requestLocation();
  }, []);

  const loadFavorites = () => {
    const favs = mosqueStorage.getFavorites();
    setFavorites(favs);
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("আপনার ব্রাউজার লোকেশন সাপোর্ট করে না");
      return;
    }

    setLoading(true);
    setError(null);
    setPermissionDenied(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setUserLocation(location);
        fetchNearbyMosques(location);
      },
      (err) => {
        console.error("Location error:", err);
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setPermissionDenied(true);
          setError("লোকেশন অ্যাক্সেসের অনুমতি প্রয়োজন। অনুগ্রহ করে আপনার ব্রাউজার সেটিংস থেকে অনুমতি দিন।");
        } else {
          setError("লোকেশন পেতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const fetchNearbyMosques = async (location: { lat: number; lon: number }) => {
    try {
      setLoading(true);
      setError(null);

      // Using Overpass API for OpenStreetMap data (more reliable for mosques)
      const radius = 5000; // 5km
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${location.lat},${location.lon});
          way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${location.lat},${location.lon});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("মসজিদের তথ্য পেতে সমস্যা হয়েছে");
      }

      const data = await response.json();
      
      const mosquesData: Mosque[] = data.elements
        .filter((el: any) => el.type === "node" && el.tags)
        .map((el: any) => {
          const distance = calculateDistance(
            location.lat,
            location.lon,
            el.lat,
            el.lon
          );
          
          return {
            id: `${el.id}`,
            name: el.tags.name || el.tags["name:bn"] || "নামহীন মসজিদ",
            address: formatAddress(el.tags),
            lat: el.lat,
            lon: el.lon,
            distance,
            type: el.tags.building || "mosque",
          };
        })
        .sort((a: Mosque, b: Mosque) => (a.distance || 0) - (b.distance || 0));

      setMosques(mosquesData);
      
      if (mosquesData.length === 0) {
        toast({
          title: "কোনো মসজিদ পাওয়া যায়নি",
          description: "আপনার আশেপাশে কোনো মসজিদ পাওয়া যায়নি। রেডিয়াস বাড়ান বা অন্য এলাকায় খুঁজুন।",
        });
      } else {
        toast({
          title: "মসজিদ পাওয়া গেছে",
          description: `${mosquesData.length}টি মসজিদ খুঁজে পাওয়া গেছে`,
        });
      }
    } catch (err) {
      console.error("Error fetching mosques:", err);
      setError("মসজিদের তথ্য লোড করতে সমস্যা হয়েছে। ইন্টারনেট সংযোগ চেক করুন।");
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value: number): number => {
    return (value * Math.PI) / 180;
  };

  const formatAddress = (tags: any): string => {
    const parts = [];
    if (tags["addr:street"]) parts.push(tags["addr:street"]);
    if (tags["addr:city"]) parts.push(tags["addr:city"]);
    if (tags["addr:district"]) parts.push(tags["addr:district"]);
    if (parts.length === 0 && tags.place) parts.push(tags.place);
    return parts.length > 0 ? parts.join(", ") : "ঠিকানা পাওয়া যায়নি";
  };

  const handleRefresh = () => {
    if (userLocation) {
      fetchNearbyMosques(userLocation);
    } else {
      requestLocation();
    }
  };

  const handleToggleFavorite = (mosque: Mosque) => {
    if (mosqueStorage.isFavorite(mosque.id)) {
      mosqueStorage.removeFavorite(mosque.id);
      toast({
        title: "প্রিয় তালিকা থেকে সরানো হয়েছে",
        description: mosque.name,
      });
    } else {
      mosqueStorage.addFavorite(mosque);
      toast({
        title: "প্রিয় তালিকায় যুক্ত হয়েছে",
        description: mosque.name,
      });
    }
    loadFavorites();
  };

  const handleGetDirections = (mosque: Mosque) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lon}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar title="মসজিদ খুঁজুন" showBack />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Welcome Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">আপনার আশেপাশের মসজিদ খুঁজুন</h3>
              <p className="text-sm text-muted-foreground">
                GPS ব্যবহার করে সহজেই নিকটতম মসজিদগুলি খুঁজে পান
              </p>
            </div>
          </div>
        </Card>

        {/* Error/Permission Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              {permissionDenied && (
                <Button size="sm" variant="outline" onClick={requestLocation}>
                  পুনরায় চেষ্টা করুন
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Card className="p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-center text-muted-foreground">
                মসজিদ খুঁজছি...
              </p>
            </div>
          </Card>
        )}

        {/* Refresh Button */}
        {!loading && userLocation && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              রিফ্রেশ করুন
            </Button>
          </div>
        )}

        {/* Main Content */}
        {!loading && userLocation && mosques.length > 0 && (
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list" className="gap-2">
                <List className="h-4 w-4" />
                তালিকা
              </TabsTrigger>
              <TabsTrigger value="favorites" className="gap-2">
                <Heart className="h-4 w-4" />
                প্রিয়
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-6">
              <MosqueList
                mosques={mosques}
                onMosqueSelect={setSelectedMosque}
                onToggleFavorite={handleToggleFavorite}
                onGetDirections={handleGetDirections}
              />
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              {favorites.length > 0 ? (
                <MosqueList
                  mosques={favorites}
                  onMosqueSelect={setSelectedMosque}
                  onToggleFavorite={handleToggleFavorite}
                  onGetDirections={handleGetDirections}
                />
              ) : (
                <Card className="p-12 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    এখনো কোনো প্রিয় মসজিদ যুক্ত করা হয়নি
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* No Location Prompt */}
        {!loading && !userLocation && !error && (
          <Card className="p-8 text-center">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
            <h3 className="font-semibold text-lg mb-2">লোকেশন প্রয়োজন</h3>
            <p className="text-muted-foreground mb-6">
              আপনার আশেপাশের মসজিদ খুঁজতে লোকেশন অনুমতি দিন
            </p>
            <Button onClick={requestLocation} className="gap-2">
              <Navigation className="h-4 w-4" />
              লোকেশন অনুমতি দিন
            </Button>
          </Card>
        )}
      </main>

      {/* Mosque Details Modal */}
      {selectedMosque && (
        <MosqueDetails
          mosque={selectedMosque}
          userLocation={userLocation}
          onClose={() => setSelectedMosque(null)}
          onToggleFavorite={handleToggleFavorite}
          onGetDirections={handleGetDirections}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default MosqueFinder;
