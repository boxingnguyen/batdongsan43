# Image Dimensions Reference

This document lists all images in the project with their actual dimensions. Use these when replacing `Image` with `ImageWithSkeleton` component.

## Symphony5 Images (Key ones for skeleton replacement)

| Image Path | Width | Height | Aspect Ratio |
|-----------|-------|--------|--------------|
| symphony5/hero-12-5.jpg | 1920 | 985 | 1.95 |
| symphony5/hero-12-5-mobile.jpg | 942 | 1257 | 0.75 |
| symphony5/gioi-thieu-1-new.jpg | 960 | 589 | 1.63 |
| symphony5/gioi-thieu-2.jpg | 960 | 589 | 1.63 |
| symphony5/stransit-1-fn-new.png | 1920 | 790 | 2.43 |
| symphony5/stransit-1-fn-mobile-new.png | 790 | 790 | 1.0 |
| symphony5/map-tien-ich-new.jpg | 1300 | 569 | 2.28 |
| symphony5/map-tien-ich-2.jpg | 1300 | 569 | 2.28 |
| symphony5/map-tien-ich-3-1.jpg | 1300 | 569 | 2.28 |
| symphony5/map-tien-ich-4.jpg | 1300 | 569 | 2.28 |
| symphony5/Tron-ven-he-tien-ich-cua-To-hop-dang-cap-tu-Sun-Group-1.png | 600 | 127 | 4.72 |
| symphony5/view-2.png | 50 | 50 | 1.0 |
| symphony5/dau-tu-1-fn.png | 790 | 790 | 1.0 |
| symphony5/nguoi-toi-song.png | 50 | 50 | 1.0 |
| symphony5/dau-tu-2-fn.png | 790 | 790 | 1.0 |
| symphony5/gia.png | 50 | 50 | 1.0 |
| symphony5/dau-tu-3.png | 790 | 790 | 1.0 |
| symphony5/San-pham-dau-tu-dong-tien-hap-dan-new-1.png | 600 | 132 | 4.55 |
| symphony5/Bieu-tuong-dat-gia-ben-bo-song-Han-new-2.png | 600 | 132 | 4.55 |
| symphony5/MAP-moi_.jpg | 1600 | 800 | 2.0 |
| symphony5/MAP-moi-mobile.jpg | 1209 | 1615 | 0.75 |
| symphony5/San-pham-STUDIO.jpg | 640 | 853 | 0.75 |
| symphony5/1BR.jpg | 640 | 853 | 0.75 |
| symphony5/1BR-2.jpg | 640 | 853 | 0.75 |
| symphony5/1BR-3.jpg | 640 | 853 | 0.75 |
| symphony5/Mat-bang-Layout-can-ho-1.png | 600 | 62 | 9.68 |
| symphony5/layout-toa.jpg | 960 | 640 | 1.5 |
| symphony5/San-pham-da-dang-1.png | 600 | 90 | 6.67 |
| symphony5/san-pham-1.jpg | 960 | 640 | 1.5 |
| symphony5/Chinh-sach-so-huu.png | 600 | 123 | 4.88 |
| symphony5/csbh-new.png | 1920 | 853 | 2.25 |
| symphony5/csbh-new-mobile-1.png | 1331 | 1652 | 0.81 |
| symphony5/f1_sun_group.jpg | 2048 | 1332 | 1.54 |
| symphony5/dtl.jpg | 960 | 589 | 1.63 |

## Home Images (Common ones)

| Image Path | Width | Height |
|-----------|-------|--------|
| home/cover-pool.png | 1920 | 950 |
| home/cover-image.jpg | 800 | 454 |
| home/profile.jpg | 1023 | 1537 |
| home/bg-overview-project.jpg | 1920 | 1090 |
| home/project-overview.png | 2723 | 2552 |
| home/banner-1.jpg | 3194 | 2129 |
| home/banner-2.png | 1921 | 1281 |
| home/gallery/image-1.jpg | 900 | 675 |
| home/connection-1.jpg | 2478 | 1343 |

## How to Use

When replacing an Image component with ImageWithSkeleton:

```tsx
// OLD
<Image
  src="/images/symphony5/hero-12-5.jpg"
  alt="..."
  width={1920}
  height={985}
  fill
  className="object-cover"
/>

// NEW
<ImageWithSkeleton
  src="/images/symphony5/hero-12-5.jpg"
  alt="..."
  width={1920}
  height={985}
  fill
  className="object-cover"
/>
```

The `ImageWithSkeleton` component will automatically:
- Calculate aspect ratio from width/height (1920:985 = 1.95)
- Show skeleton at correct dimensions while loading
- Swap to image when ready
