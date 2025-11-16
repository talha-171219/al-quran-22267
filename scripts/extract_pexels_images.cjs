const fs = require('fs');
const path = require('path');

const markdownContent = `
3,000+ Best Islamic Pictures · 100% Free Download · Pexels Stock Photos

Pexels will be offline for maintenance on November 19th from 10:00 PM to 2:00 AM UTC (about 4 hours). We're upgrading our infrastructure to make things run more smoothly and securely.

#### Filters

##### Orientation

Any

Horizontal

Vertical

Square

* * *

##### People

Any

0

1

2

3+

* * *

##### Age

Any

Baby

Child

Teenager

Adult

Senior adult

* * *

##### Width

Minimum

1,080px

Maximum

20,000px+

* * *

##### Height

Minimum

1,080px

Maximum

20,000px+

* * *

##### Color

* * *

##### Date

Any

Last 24 hours

Last week

Last month

Last year

Filters

[islamic background](/search/islamic%20background/)[mosque](/search/mosque/)[quran](/search/quran/)[islam](/search/islam/)[makkah](/search/makkah/)[islamic art](/search/islamic%20art/)[nature](/search/nature/)[mecca](/search/mecca/)[ramadan](/search/ramadan/)[masjid nabawi](/search/masjid%20nabawi/)[islamic architecture](/search/islamic%20architecture/)[kaaba](/search/kaaba/)[medina](/search/medina/)[background](/search/background/)[muslim pray](/search/muslim%20pray/)[islamic calligraphy](/search/islamic%20calligraphy/)

Islamic Pictures
================

[Photos30.4K](/search/islamic/)[Videos3.1K](/search/videos/islamic/)[Users3.7K](/search/users/islamic/)

Popular

#### Sponsored Photos

[](https://www.istockphoto.com/photos/islamic?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_logo&utm_term=islamic)

[![](https://media.istockphoto.com/id/1011940756/photo/muslim-men-praying-during-ramadan.jpg?b=1&s=612x612&w=0&k=20&c=CnkjbcR4Tc6BQNSBqcfiz_7duTgwygpr1OM3qSP-h3k=)](https://www.istockphoto.com/photo/muslim-men-praying-during-ramadan-gm1011940756-272634430?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_media&utm_term=islamic)[![](https://media.istockphoto.com/id/1001021150/photo/muslim-man-is-praying-in-mosque.jpg?b=1&s=612x612&w=0&k=20&c=-eczAZ1R0VtCX7LiFAMwSyiFHKCiOCnjO7Rr9Gqr7Mw=)](https://www.istockphoto.com/photo/muslim-man-is-praying-in-mosque-gm1001021150-270630595?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_media&utm_term=islamic)[![](https://media.istockphoto.com/id/1311980207/photo/moon-light-shine-through-the-window-into-islamic-mosque-interior-ramadan-kareem-islamic.jpg?b=1&s=612x612&w=0&k=20&c=Zmkjfyr-_cQaRfp_JQKksFbGVX_3-lNtWe2lxQTZumQ=)](https://www.istockphoto.com/photo/moon-light-shine-through-the-window-into-islamic-mosque-interior-ramadan-kareem-gm1311980207-400921018?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_media&utm_term=islamic)[![](https://media.istockphoto.com/id/92010901/photo/lamenting-muslims-in-mosque.jpg?b=1&s=612x612&w=0&k=20&c=U7fD5PAwpBirETXY3mF_5R6Rx0Q352039eil3Bdba1c=)](https://www.istockphoto.com/photo/lamenting-muslims-in-mosque-gm92010901-4270437?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_media&utm_term=islamic)

[Get 20% off with code PEXELS20 »](https://www.istockphoto.com/photos/islamic?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_couponcode&utm_term=islamic)

[![Free A glowing lantern with crescent motifs creates a warm ambiance for Ramadan or Eid. Stock Photo](https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/photo-of-ramadan-light-on-top-of-table-2233416/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=2233416&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2233416%2Fpexels-photo-2233416.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?cs=srgb&dl=pexels-aqtai-2233416.jpg&fm=jpg "Download")

[![Free A stunning view of a historical minaret in New Delhi with birds in flight against a clear blue sky. Stock Photo](https://images.pexels.com/photos/2349168/pexels-photo-2349168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/birds-flying-above-a-historical-tower-2349168/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=2349168&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2349168%2Fpexels-photo-2349168.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D4140%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/2349168/pexels-photo-2349168.jpeg?cs=srgb&dl=pexels-timfuzail-2349168.jpg&fm=jpg "Download")

[![Free Beautiful view of Istanbul's mosques at sunset with vibrant sky and silhouettes. Stock Photo](https://images.pexels.com/photos/2236674/pexels-photo-2236674.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/concrete-dome-buildings-during-golden-hour-2236674/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=2236674&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2236674%2Fpexels-photo-2236674.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/2236674/pexels-photo-2236674.jpeg?cs=srgb&dl=pexels-konevi-2236674.jpg&fm=jpg "Download")

[![Free Peaceful view of a mosque reflecting in the calm waters at sunset, creating a serene landscape in Malaysia. Stock Photo](https://images.pexels.com/photos/394355/pexels-photo-394355.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/white-concrete-building-beside-body-of-water-394355/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=394355&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F394355%2Fpexels-photo-394355.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/394355/pexels-photo-394355.jpeg?cs=srgb&dl=pexels-umaraffan499-394355.jpg&fm=jpg "Download")

[![Free Stunning view of Putra Mosque's domes against a bright sky, showcasing Islamic architecture. Stock Photo](https://images.pexels.com/photos/326716/pexels-photo-326716.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/view-of-temple-against-cloudy-sky-326716/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=326716&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F326716%2Fpexels-photo-326716.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D5613%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/326716/pexels-photo-326716.jpeg?cs=srgb&dl=pexels-pixabay-326716.jpg&fm=jpg "Download")

[![Free Stunning view of the Moscow Cathedral Mosque during sunset with a golden dome and minarets. Stock Photo](https://images.pexels.com/photos/161276/moscow-cathedral-mosque-prospekt-mira-ramadan-sky-161276.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/gold-mosque-during-sunset-161276/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=161276&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F161276%2Fmoscow-cathedral-mosque-prospekt-mira-ramadan-sky-161276.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6667%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/161276/moscow-cathedral-mosque-prospekt-mira-ramadan-sky-161276.jpeg?cs=srgb&dl=pexels-pixabay-161276.jpg&fm=jpg "Download")

[![Free Beautiful evening view of Jama Masjid in New Delhi with people gathering at sunset. Stock Photo](https://images.pexels.com/photos/2344997/pexels-photo-2344997.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/view-of-mosque-at-sunset-2344997/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=2344997&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2344997%2Fpexels-photo-2344997.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D4082%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/2344997/pexels-photo-2344997.jpeg?cs=srgb&dl=pexels-timfuzail-2344997.jpg&fm=jpg "Download")

[![Free A person in traditional attire standing among columns of the Sheikh Zayed Mosque in Abu Dhabi. Stock Photo](https://images.pexels.com/photos/1122407/pexels-photo-1122407.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/photo-of-woman-wearing-abaya-1122407/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=1122407&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1122407%2Fpexels-photo-1122407.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D4082%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/1122407/pexels-photo-1122407.jpeg?cs=srgb&dl=pexels-ollivves-1122407.jpg&fm=jpg "Download")

[![Free Sunlit arches inside a beautiful mosque interior showcasing Islamic architecture at sunset. Stock Photo](https://images.pexels.com/photos/2449510/pexels-photo-2449510.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/empty-building-2449510/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=2449510&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2449510%2Fpexels-photo-2449510.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D3750%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/2449510/pexels-photo-2449510.jpeg?cs=srgb&dl=pexels-movoyagee-1264169-2449510.jpg&fm=jpg "Download")

[![Free Explore the elaborate Islamic architectural details inside a mosque in Adana, Turkey. Stock Photo](https://images.pexels.com/photos/2104856/pexels-photo-2104856.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/beige-post-2104856/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=2104856&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2104856%2Fpexels-photo-2104856.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D4328%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/2104856/pexels-photo-2104856.jpeg?cs=srgb&dl=pexels-enginakyurt-2104856.jpg&fm=jpg "Download")

[![Free The stunning Dome of the Rock with its golden dome under a clear blue sky in Jerusalem. Stock Photo](https://images.pexels.com/photos/1659294/pexels-photo-1659294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/dome-of-the-rock-jerusalem-1659294/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=1659294&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1659294%2Fpexels-photo-1659294.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/1659294/pexels-photo-1659294.jpeg?cs=srgb&dl=pexels-becca-siegel-792310-1659294.jpg&fm=jpg "Download")

[![Free Close-up of a historic building's ornate stone facade featuring intricate geometric patterns and arches. Stock Photo](https://images.pexels.com/photos/1047284/pexels-photo-1047284.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/beige-concrete-walls-1047284/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=1047284&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1047284%2Fpexels-photo-1047284.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/1047284/pexels-photo-1047284.jpeg?cs=srgb&dl=pexels-andreea-ch-371539-1047284.jpg&fm=jpg "Download")

[![Free Blue mosque dome with crescent and star against a cloudy sky, showcasing modern Islamic architecture. Stock Photo](https://images.pexels.com/photos/908278/pexels-photo-908278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/silver-mosque-top-dome-ornament-908278/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=908278&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F908278%2Fpexels-photo-908278.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/908278/pexels-photo-908278.jpeg?cs=srgb&dl=pexels-khairulonggon-908278.jpg&fm=jpg "Download")

[![Free A black and white close-up of an open Quran on a wooden stand with prayer beads, symbolizing Islamic faith and devotion. Stock Photo](https://images.pexels.com/photos/36704/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/monochrome-photo-of-opened-quran-36704/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=36704&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F36704%2Fpexels-photo.jpg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/36704/pexels-photo.jpg?cs=srgb&dl=pexels-mloky96-36704.jpg&fm=jpg "Download")

[![Create your own islamic image with Canva](https://content.pexels.com/images/canva/ai-generated-ad/off-theme/misty_alpine_meadow_at_dawn-full.jpg)](https://www.canva.com/ai-image-generator?prompt=High%20quality%20stock%20photo%20of%20islamic%2C%20professional%20lighting%2C%20sharp%20focus%2C%20natural%20colors%2C%20realistic%20detail%2C%20modern%20composition%2C%20commercial%20use%20standard%2C%20editorial%20style%2C%20ultra%20HD%2C%20clean%20background&utm_source=pexels&utm_campaign=aigc_pexelscampaign&utm_medium=partner)[![Create your own islamic image with Canva](https://content.pexels.com/images/canva/ai-generated-ad/off-theme/flowers_meticulouly_arranged-full.jpg)](https://www.canva.com/ai-image-generator?prompt=High%20quality%20stock%20photo%20of%20islamic%2C%20professional%20lighting%2C%20sharp%20focus%2C%20natural%20colors%2C%20realistic%20detail%2C%20modern%20composition%2C%20commercial%20use%20standard%2C%20editorial%20style%2C%20ultra%20HD%2C%20clean%20background&utm_source=pexels&utm_campaign=aigc_pexelscampaign&utm_medium=partner)[![Create your own islamic image with Canva](https://content.pexels.com/images/canva/ai-generated-ad/off-theme/single_mushroom_in_shadowed_forest_floor-full.jpg)](https://www.canva.com/ai-image-generator?prompt=High%20quality%20stock%20photo%20of%20islamic%2C%20professional%20lighting%2C%20sharp%20focus%2C%20natural%20colors%2C%20realistic%20detail%2C%20modern%20composition%2C%20commercial%20use%20standard%2C%20editorial%20style%2C%20ultra%20HD%2C%20clean%20background&utm_source=pexels&utm_campaign=aigc_pexelscampaign&utm_medium=partner)[![Create your own islamic image with Canva](https://content.pexels.com/images/canva/ai-generated-ad/off-theme/forest_starry_winter_night-full.jpg)](https://www.canva.com/ai-image-generator?prompt=High%20quality%20stock%20photo%20of%20islamic%2C%20professional%20lighting%2C%20sharp%20focus%2C%20natural%20colors%2C%20realistic%20detail%2C%20modern%20composition%2C%20commercial%20use%20standard%2C%20editorial%20style%2C%20ultra%20HD%2C%20clean%20background&utm_source=pexels&utm_campaign=aigc_pexelscampaign&utm_medium=partner)

Bring your ideas to life with Canva AI

[Get started for free](https://www.canva.com/ai-image-generator?prompt=High%20quality%20stock%20photo%20of%20islamic%2C%20professional%20lighting%2C%20sharp%20focus%2C%20natural%20colors%2C%20realistic%20detail%2C%20modern%20composition%2C%20commercial%20use%20standard%2C%20editorial%20style%2C%20ultra%20HD%2C%20clean%20background&utm_source=pexels&utm_campaign=aigc_pexelscampaign&utm_medium=partner)

[![Free Sunlight streaming through a Mughal-style window in Agra, showcasing intricate Islamic architectural patterns. Stock Photo](https://images.pexels.com/photos/3254036/pexels-photo-3254036.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/photo-of-islamic-window-3254036/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=3254036&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F3254036%2Fpexels-photo-3254036.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D4082%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/3254036/pexels-photo-3254036.jpeg?cs=srgb&dl=pexels-jodaarba-3254036.jpg&fm=jpg "Download")

[![Free Mass of pilgrims in traditional attire at Kaaba during the Hajj pilgrimage. Stock Photo](https://images.pexels.com/photos/2895295/pexels-photo-2895295.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/photo-of-people-gathering-near-kaaba-mecca-saudi-arabia-2895295/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=2895295&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2895295%2Fpexels-photo-2895295.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/2895295/pexels-photo-2895295.jpeg?cs=srgb&dl=pexels-haydan-as-soendawy-730525-2895295.jpg&fm=jpg "Download")

[![Free A close-up of prayer beads resting on an open Quran page, depicting Islamic faith and worship. Stock Photo](https://images.pexels.com/photos/318451/pexels-photo-318451.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/monochrome-photo-of-quran-318451/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=318451&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F318451%2Fpexels-photo-318451.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6451%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/318451/pexels-photo-318451.jpeg?cs=srgb&dl=pexels-tayebmezahdia-318451.jpg&fm=jpg "Download")

[![Free Beautiful mosque reflecting in the lake with a mountainous backdrop in Kuala Kubu Bharu, Malaysia. Stock Photo](https://images.pexels.com/photos/908055/pexels-photo-908055.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/white-and-red-house-reflecting-on-body-of-water-under-blue-sky-908055/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=908055&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F908055%2Fpexels-photo-908055.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/908055/pexels-photo-908055.jpeg?cs=srgb&dl=pexels-khairulonggon-908055.jpg&fm=jpg "Download")

[![Free Stunning view of the Prophet's Mosque minarets at sunset in Medina, Saudi Arabia. Stock Photo](https://images.pexels.com/photos/2830460/pexels-photo-2830460.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/dome-buildings-during-golden-hour-2830460/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=2830460&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2830460%2Fpexels-photo-2830460.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/2830460/pexels-photo-2830460.jpeg?cs=srgb&dl=pexels-konevi-2830460.jpg&fm=jpg "Download")

[![Free Explore the stunning architectural beauty of a mosque courtyard in Dubai, UAE, perfect for travel and Islamic architecture enthusiasts. Stock Photo](https://images.pexels.com/photos/1064766/pexels-photo-1064766.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/outdoor-fountain-at-a-mosque-1064766/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=1064766&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1064766%2Fpexels-photo-1064766.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D3891%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/1064766/pexels-photo-1064766.jpeg?cs=srgb&dl=pexels-walidphotoz-1064766.jpg&fm=jpg "Download")

[![Free A stunning view of the domes and minarets of Sheikh Zayed Grand Mosque under a clear sky. Stock Photo](https://images.pexels.com/photos/161153/sheikh-zayed-grand-mosque-white-mosque-abu-dhabi-161153.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/white-and-brown-concrete-building-under-cloudy-sky-during-daytime-161153/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=161153&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F161153%2Fsheikh-zayed-grand-mosque-white-mosque-abu-dhabi-161153.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6794%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/161153/sheikh-zayed-grand-mosque-white-mosque-abu-dhabi-161153.jpeg?cs=srgb&dl=pexels-pixabay-161153.jpg&fm=jpg "Download")

[

*   ![](https://images.pexels.com/videos/5973390/pexels-photo-5973390.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=170.625&fit=crop&h=276.25)
*   ![](https://images.pexels.com/photos/7249768/pexels-photo-7249768.jpeg?auto=compress&cs=tinysrgb&h=138.125&fit=crop&w=154.375&dpr=1)
*   ![](https://images.pexels.com/photos/7957121/pexels-photo-7957121.jpeg?auto=compress&cs=tinysrgb&h=138.125&fit=crop&w=154.375&dpr=1)

#### Islam

47







](/collections/islam-yykni6m/)

#### Sponsored Photos

[](https://www.istockphoto.com/photos/islamic?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_logo&utm_term=islamic)

[![](https://media.istockphoto.com/id/1011940756/photo/muslim-men-praying-during-ramadan.jpg?b=1&s=612x612&w=0&k=20&c=CnkjbcR4Tc6BQNSBqcfiz_7duTgwygpr1OM3qSP-h3k=)](https://www.istockphoto.com/photo/muslim-men-praying-during-ramadan-gm1011940756-272634430?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_media&utm_term=islamic)[![](https://media.istockphoto.com/id/1001021150/photo/muslim-man-is-praying-in-mosque.jpg?b=1&s=612x612&w=0&k=20&c=-eczAZ1R0VtCX7LiFAMwSyiFHKCiOCnjO7Rr9Gqr7Mw=)](https://www.istockphoto.com/photo/muslim-man-is-praying-in-mosque-gm1001021150-270630595?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_media&utm_term=islamic)[![](https://media.istockphoto.com/id/1311980207/photo/moon-light-shine-through-the-window-into-islamic-mosque-interior-ramadan-kareem-islamic.jpg?b=1&s=612x612&w=0&k=20&c=Zmkjfyr-_cQaRfp_JQKksFbGVX_3-lNtWe2lxQTZumQ=)](https://www.istockphoto.com/photo/moon-light-shine-through-the-window-into-islamic-mosque-interior-ramadan-kareem-gm1311980207-400921018?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_media&utm_term=islamic)[![](https://media.istockphoto.com/id/92010901/photo/lamenting-muslims-in-mosque.jpg?b=1&s=612x612&w=0&k=20&c=U7fD5PAwpBirETXY3mF_5R6Rx0Q352039eil3Bdba1c=)](https://www.istockphoto.com/photo/lamenting-muslims-in-mosque-gm92010901-4270437?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_media&utm_term=islamic)

[Get 20% off with code PEXELS20 »](https://www.istockphoto.com/photos/islamic?utm_source=pexels&utm_medium=affiliate&utm_campaign=sponsored_photo&utm_content=srp_inline_couponcode&utm_term=islamic)

[![Free Sheikh Zayed Grand Mosque illuminated at twilight, showcasing stunning architecture in Abu Dhabi. Stock Photo](https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/mosque-1537086/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=1537086&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1537086%2Fpexels-photo-1537086.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D6123%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/1537086/pexels-photo-1537086.jpeg?cs=srgb&dl=pexels-manpritkalsi-1537086.jpg&fm=jpg "Download")

[![Free Top view of an elegant Quran and prayer beads on ornate white cloth, symbolizing Islamic faith. Stock Photo](https://images.pexels.com/photos/7249294/pexels-photo-7249294.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/black-and-gold-book-on-white-and-brown-floral-textile-7249294/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=7249294&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F7249294%2Fpexels-photo-7249294.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D4082%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/7249294/pexels-photo-7249294.jpeg?cs=srgb&dl=pexels-rdne-7249294.jpg&fm=jpg "Download")

[![Free From below scenery view of aged high masonry tower with columns and decorative elements on walls and pointed spire on top with lamps under sky with clouds in daylight Stock Photo](https://images.pexels.com/photos/3819046/pexels-photo-3819046.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)

](/photo/old-stone-tower-with-spiky-spire-under-blue-cloudy-sky-3819046/)

[Edit](https://www.canva.com/content-partner/?utm_medium=acquisitions&utm_source=pexels&utm_campaign=predownload%20button&utm_content=edit%20in%20canva&external-id=3819046&image-url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F3819046%2Fpexels-photo-3819046.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D4331%26fit%3Dmax&onboarding-flow=image-editor-panel)

[Download](https://images.pexels.com/photos/3819046/pexels-photo-3819046.jpeg?cs=srgb&dl=pexels-mo2salah-3819046.jpg&fm=jpg "Download")

Load More

[Previous](/search/islamic/#)[1](/search/islamic/)[2](/search/islamic/?page=2)[3](/search/islamic/?page=3)[4](/search/islamic/?page=4)[5](/search/islamic/?page=5)[6](/search/islamic/?page=6)[Next](/search/islamic/?page=2)

![Pexels Logo](https://cdn-au.onetrust.com/logos/3dbea99f-abc0-4dbd-bcd7-8f6dfcaea28d/08d31c24-1bed-4774-903b-b1725205a842/bb79b0fe-48e3-427c-bbac-47fc621af04c/3IX0JssK_400x400.jpeg)

Manage cookies
--------------

Cookies and similar technologies collect certain information about how you’re using our website. Some of them are essential, and without them you wouldn’t be able to use Pexels. But others are optional, and you get to choose whether we use them or not. Hungry for more?  
[Read our full Cookie Policy](https://www.pexels.com/cookies/)

Allow All

### Manage Consent Preferences

#### Strictly Necessary Cookies

Always Active

These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.

#### Performance Cookies

 Performance Cookies

These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.

#### Functional Cookies

 Functional Cookies

These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.

#### Targeting Cookies

 Targeting Cookies

These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.

Back Button

### Performance Cookies

 Search Icon

Filter Icon

Clear

 checkbox label label

Apply Cancel

Consent Leg.Interest

 checkbox label label

 checkbox label label

 checkbox label label

Reject All Confirm My Choices

[![Powered by Onetrust](https://cdn-au.onetrust.com/logos/static/powered_by_logo.svg "Powered by OneTrust Opens in a new Tab")](https://www.onetrust.com/products/cookie-consent/)
`;

const pexelsImages = [];
const lines = markdownContent.split(/\r?\n/);

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Regex to find image URLs from Pexels
    const imageMatch = line.match(/!\[.*?\]\((https:\/\/images\.pexels\.com\/photos\/.*?)\)/);
    if (imageMatch) {
        const thumbnailUrl = imageMatch[1];
        // Pexels images often have a 'w=500' or similar parameter for thumbnail.
        // To get a potentially larger version, we can remove or modify this parameter.
        // For simplicity, let's use the provided URL as both thumbnail and full for now,
        // or try to get a larger version if possible.
        // The download link is also available, which is usually a higher resolution.
        // Example: https://images.pexels.com/photos/2233416/pexels-photo-2233416.jpeg?cs=srgb&dl=pexels-aqtai-2233416.jpg&fm=jpg
        const fullImageUrlMatch = line.match(/\[Download\]\((https:\/\/images\.pexels\.com\/photos\/.*?dl=.*?)\s*".*?"\)/);
        const fullImageUrl = fullImageUrlMatch ? fullImageUrlMatch[1] : thumbnailUrl.replace(/w=\d+/, 'w=1200'); // Attempt to get a larger width

        pexelsImages.push({
            id: (pexelsImages.length + 1).toString(),
            thumbnail: thumbnailUrl,
            full: fullImageUrl,
            quote: "" // Pexels images don't have direct quotes in this format
        });
    }
}

fs.writeFileSync('src/data/pexelsImages.json', JSON.stringify(pexelsImages, null, 2));
console.log('Extracted Pexels images saved to src/data/pexelsImages.json');
