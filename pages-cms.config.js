// Pages CMS Configuration for Lamb Cottage Caravan Park
// This configuration defines the content structure and media settings for Pages CMS

export default {
  // Media configuration for image uploads
  media: {
    input: 'public/images',
    output: 'public/images',
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    categories: {
      backgrounds: {
        path: 'backgrounds',
        description: 'Hero and section background images'
      },
      gallery: {
        path: 'gallery',
        description: 'Photo gallery images'
      },
      facilities: {
        path: 'facilities',
        description: 'Facility and amenity images'
      },
      caravans: {
        path: 'static-caravans',
        description: 'Static caravan images'
      },
      uploads: {
        path: 'uploads',
        description: 'General content uploads'
      },
      footer: {
        path: 'Footer-images',
        description: 'Award logos and footer images'
      }
    }
  },

  // Content collections configuration
  collections: {
    // Site-wide settings and configuration
    'site-settings': {
      label: 'Site Settings',
      description: 'Global site configuration and settings',
      file: 'content/site-settings.json',
      fields: [
        {
          name: 'site_name',
          label: 'Site Name',
          widget: 'string',
          default: 'Lamb Cottage Caravan Park'
        },
        {
          name: 'site_description',
          label: 'Site Description',
          widget: 'text',
          default: 'Award-winning adults-only caravan park in Cheshire'
        },
        {
          name: 'contact',
          label: 'Contact Information',
          widget: 'object',
          fields: [
            { name: 'phone', label: 'Phone Number', widget: 'string' },
            { name: 'email', label: 'Email Address', widget: 'string' },
            { name: 'address', label: 'Full Address', widget: 'text' },
            { name: 'hours', label: 'Opening Hours', widget: 'text' }
          ]
        },
        {
          name: 'social_media',
          label: 'Social Media Links',
          widget: 'object',
          fields: [
            { name: 'facebook', label: 'Facebook URL', widget: 'string', required: false },
            { name: 'instagram', label: 'Instagram URL', widget: 'string', required: false },
            { name: 'tripadvisor', label: 'TripAdvisor URL', widget: 'string', required: false }
          ]
        },
        {
          name: 'footer_logos',
          label: 'Footer Award Logos',
          widget: 'list',
          fields: [
            { name: 'id', label: 'Logo ID', widget: 'string' },
            { name: 'name', label: 'Logo Name', widget: 'string' },
            { name: 'image', label: 'Logo Image', widget: 'image' },
            { name: 'link', label: 'Logo Link', widget: 'string', required: false },
            { name: 'enabled', label: 'Enabled', widget: 'boolean', default: true },
            { name: 'order', label: 'Display Order', widget: 'number' }
          ]
        }
      ]
    },

    // Main site content (homepage sections)
    'site-content': {
      label: 'Site Content',
      description: 'Homepage sections and main content',
      file: 'content/site-content.json',
      fields: [
        {
          name: 'hero',
          label: 'Hero Section',
          widget: 'object',
          fields: [
            { name: 'title', label: 'Hero Title', widget: 'string' },
            { name: 'subtitle', label: 'Hero Subtitle', widget: 'text' },
            {
              name: 'ctaButton',
              label: 'Call-to-Action Button',
              widget: 'object',
              fields: [
                { name: 'text', label: 'Button Text', widget: 'string' },
                { name: 'url', label: 'Button URL', widget: 'string' }
              ]
            },
            {
              name: 'backgroundImage',
              label: 'Background Image',
              widget: 'object',
              fields: [
                { name: 'src', label: 'Image Path', widget: 'image' },
                { name: 'alt', label: 'Alt Text', widget: 'string' },
                { name: 'opacity', label: 'Overlay Opacity', widget: 'string', default: '0.4' },
                {
                  name: 'dimensions',
                  label: 'Image Dimensions',
                  widget: 'object',
                  fields: [
                    { name: 'width', label: 'Width', widget: 'number' },
                    { name: 'height', label: 'Height', widget: 'number' },
                    { name: 'recommended', label: 'Recommended Size', widget: 'string' }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'welcome',
          label: 'Welcome Section',
          widget: 'object',
          fields: [
            { name: 'title', label: 'Welcome Title', widget: 'string' },
            { name: 'content', label: 'Welcome Content', widget: 'markdown' },
            {
              name: 'image',
              label: 'Welcome Image',
              widget: 'object',
              fields: [
                { name: 'src', label: 'Image Path', widget: 'image' },
                { name: 'alt', label: 'Alt Text', widget: 'string' }
              ]
            }
          ]
        },
        {
          name: 'tagline',
          label: 'Tagline Section',
          widget: 'object',
          fields: [
            { name: 'text', label: 'Tagline Text', widget: 'string' },
            { name: 'description', label: 'Description', widget: 'text' },
            { name: 'highlight', label: 'Highlight Text', widget: 'string' }
          ]
        },
        {
          name: 'facilities',
          label: 'Facilities Section',
          widget: 'object',
          fields: [
            { name: 'title', label: 'Section Title', widget: 'string' },
            { name: 'subtitle', label: 'Section Subtitle', widget: 'string' },
            {
              name: 'backgroundImage',
              label: 'Background Image',
              widget: 'object',
              fields: [
                { name: 'src', label: 'Image Path', widget: 'image' },
                { name: 'alt', label: 'Alt Text', widget: 'string' },
                { name: 'opacity', label: 'Overlay Opacity', widget: 'string' }
              ]
            },
            {
              name: 'items',
              label: 'Facility Items',
              widget: 'list',
              fields: [
                { name: 'title', label: 'Facility Title', widget: 'string' },
                { name: 'description', label: 'Facility Description', widget: 'text' },
                { name: 'icon', label: 'Facility Icon', widget: 'string' }
              ]
            }
          ]
        },
        {
          name: 'propertySales',
          label: 'Static Caravan Sales',
          widget: 'object',
          fields: [
            { name: 'title', label: 'Section Title', widget: 'string' },
            { name: 'subtitle', label: 'Section Subtitle', widget: 'string' },
            { name: 'description', label: 'Section Description', widget: 'text' },
            {
              name: 'properties',
              label: 'Available Properties',
              widget: 'list',
              fields: [
                { name: 'id', label: 'Property ID', widget: 'string' },
                { name: 'title', label: 'Property Title', widget: 'string' },
                { name: 'price', label: 'Property Price', widget: 'string' },
                { name: 'description', label: 'Property Description', widget: 'text' },
                {
                  name: 'features',
                  label: 'Property Features',
                  widget: 'list',
                  field: { label: 'Feature', name: 'feature', widget: 'string' }
                },
                {
                  name: 'image',
                  label: 'Property Image',
                  widget: 'object',
                  fields: [
                    { name: 'src', label: 'Image Path', widget: 'image' },
                    { name: 'alt', label: 'Alt Text', widget: 'string' }
                  ]
                },
                { name: 'available', label: 'Available for Sale', widget: 'boolean' }
              ]
            }
          ]
        },
        {
          name: 'reviews',
          label: 'Guest Reviews',
          widget: 'object',
          fields: [
            { name: 'title', label: 'Section Title', widget: 'string' },
            { name: 'subtitle', label: 'Section Subtitle', widget: 'string' },
            {
              name: 'items',
              label: 'Review Items',
              widget: 'list',
              fields: [
                { name: 'id', label: 'Review ID', widget: 'string' },
                { name: 'name', label: 'Guest Name', widget: 'string' },
                { name: 'location', label: 'Guest Location', widget: 'string' },
                { name: 'rating', label: 'Rating (1-5)', widget: 'number', min: 1, max: 5 },
                { name: 'date', label: 'Review Date', widget: 'string' },
                { name: 'title', label: 'Review Title', widget: 'string' },
                { name: 'comment', label: 'Review Comment', widget: 'text' },
                { name: 'verified', label: 'Verified Review', widget: 'boolean' }
              ]
            }
          ]
        },
        {
          name: 'bookingBanner',
          label: 'Booking Banner',
          widget: 'object',
          fields: [
            { name: 'title', label: 'Banner Title', widget: 'string' },
            { name: 'subtitle', label: 'Banner Subtitle', widget: 'string' },
            { name: 'description', label: 'Banner Description', widget: 'text' },
            {
              name: 'backgroundImage',
              label: 'Background Image',
              widget: 'object',
              fields: [
                { name: 'src', label: 'Image Path', widget: 'image' },
                { name: 'alt', label: 'Alt Text', widget: 'string' },
                { name: 'opacity', label: 'Overlay Opacity', widget: 'number', step: 0.1, min: 0, max: 1 }
              ]
            },
            {
              name: 'primaryButton',
              label: 'Primary Button',
              widget: 'object',
              fields: [
                { name: 'text', label: 'Button Text', widget: 'string' },
                { name: 'url', label: 'Button URL', widget: 'string' }
              ]
            }
          ]
        }
      ]
    },

    // Individual pages content
    'pages': {
      label: 'Pages',
      description: 'Individual page content and settings',
      folder: 'content/pages',
      create: true,
      slug: '{{slug}}',
      fields: [
        { name: 'title', label: 'Page Title', widget: 'string' },
        { name: 'description', label: 'Page Description', widget: 'text' },
        { name: 'slug', label: 'Page Slug', widget: 'string' },
        {
          name: 'hero',
          label: 'Page Hero Section',
          widget: 'object',
          fields: [
            { name: 'title', label: 'Hero Title', widget: 'string' },
            { name: 'subtitle', label: 'Hero Subtitle', widget: 'string' },
            {
              name: 'backgroundImage',
              label: 'Background Image',
              widget: 'object',
              fields: [
                { name: 'src', label: 'Image Path', widget: 'image' },
                { name: 'alt', label: 'Alt Text', widget: 'string' },
                { name: 'opacity', label: 'Overlay Opacity', widget: 'number', step: 0.1, min: 0, max: 1 }
              ]
            }
          ]
        },
        {
          name: 'content',
          label: 'Page Content',
          widget: 'object',
          fields: [
            { name: 'introduction', label: 'Introduction Text', widget: 'markdown' },
            {
              name: 'sections',
              label: 'Content Sections',
              widget: 'list',
              types: [
                {
                  name: 'text_section',
                  label: 'Text Section',
                  fields: [
                    { name: 'title', label: 'Section Title', widget: 'string' },
                    { name: 'content', label: 'Section Content', widget: 'markdown' }
                  ]
                },
                {
                  name: 'image_gallery',
                  label: 'Image Gallery',
                  fields: [
                    { name: 'title', label: 'Gallery Title', widget: 'string' },
                    {
                      name: 'images',
                      label: 'Gallery Images',
                      widget: 'list',
                      fields: [
                        { name: 'src', label: 'Image Path', widget: 'image' },
                        { name: 'alt', label: 'Alt Text', widget: 'string' },
                        { name: 'caption', label: 'Image Caption', widget: 'string', required: false }
                      ]
                    }
                  ]
                },
                {
                  name: 'feature_list',
                  label: 'Feature List',
                  fields: [
                    { name: 'title', label: 'List Title', widget: 'string' },
                    {
                      name: 'items',
                      label: 'Feature Items',
                      widget: 'list',
                      fields: [
                        { name: 'title', label: 'Feature Title', widget: 'string' },
                        { name: 'description', label: 'Feature Description', widget: 'text' },
                        { name: 'icon', label: 'Feature Icon', widget: 'string', required: false }
                      ]
                    }
                  ]
                },
                {
                  name: 'pricing_table',
                  label: 'Pricing Table',
                  fields: [
                    { name: 'title', label: 'Pricing Title', widget: 'string' },
                    {
                      name: 'seasons',
                      label: 'Seasonal Pricing',
                      widget: 'object',
                      fields: [
                        {
                          name: 'low_season',
                          label: 'Low Season',
                          widget: 'object',
                          fields: [
                            { name: 'period', label: 'Season Period', widget: 'string' },
                            {
                              name: 'rates',
                              label: 'Rates',
                              widget: 'object',
                              fields: [
                                { name: 'caravan_motorhome', label: 'Caravan/Motorhome Rate', widget: 'string' },
                                { name: 'tent', label: 'Tent Rate', widget: 'string' }
                              ]
                            }
                          ]
                        },
                        {
                          name: 'mid_season',
                          label: 'Mid Season',
                          widget: 'object',
                          fields: [
                            { name: 'period', label: 'Season Period', widget: 'string' },
                            {
                              name: 'rates',
                              label: 'Rates',
                              widget: 'object',
                              fields: [
                                { name: 'caravan_motorhome', label: 'Caravan/Motorhome Rate', widget: 'string' },
                                { name: 'tent', label: 'Tent Rate', widget: 'string' }
                              ]
                            }
                          ]
                        },
                        {
                          name: 'high_season',
                          label: 'High Season',
                          widget: 'object',
                          fields: [
                            { name: 'period', label: 'Season Period', widget: 'string' },
                            {
                              name: 'rates',
                              label: 'Rates',
                              widget: 'object',
                              fields: [
                                { name: 'caravan_motorhome', label: 'Caravan/Motorhome Rate', widget: 'string' },
                                { name: 'tent', label: 'Tent Rate', widget: 'string' }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    // Gallery images collection
    'gallery': {
      label: 'Photo Gallery',
      description: 'Manage photo gallery images',
      folder: 'content/gallery',
      create: true,
      slug: '{{slug}}',
      fields: [
        { name: 'title', label: 'Image Title', widget: 'string' },
        { name: 'description', label: 'Image Description', widget: 'text', required: false },
        { name: 'image', label: 'Gallery Image', widget: 'image' },
        { name: 'alt', label: 'Alt Text', widget: 'string' },
        {
          name: 'category',
          label: 'Image Category',
          widget: 'select',
          options: [
            { label: 'Facilities', value: 'facilities' },
            { label: 'Pitches', value: 'pitches' },
            { label: 'Surroundings', value: 'surroundings' },
            { label: 'Static Caravans', value: 'static-caravans' },
            { label: 'General', value: 'general' }
          ]
        },
        { name: 'featured', label: 'Featured Image', widget: 'boolean', default: false },
        { name: 'order', label: 'Display Order', widget: 'number', required: false }
      ]
    }
  }
};