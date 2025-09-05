import type { APIRoute } from 'astro';
import { z } from 'zod';
import { initializeStorage } from '../../../lib/cloudflare-storage';
import { requireAuth } from '../../../lib/auth';
import { secureAPIRoute } from '../../../lib/security';

// Import the same schema used in cloudflare-storage.ts
const ImageSchema = z.object({
  src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional()
});

const LinkSchema = z.object({
  text: z.string(),
  url: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
  external: z.boolean().optional()
});

const FacilitySchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string()
});

const PropertySchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  features: z.array(z.string()),
  image: ImageSchema,
  available: z.boolean().optional()
});

const ReviewSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  date: z.string(),
  location: z.string().optional(),
  title: z.string().optional(),
  verified: z.boolean().optional()
});

const SocialLinkSchema = z.object({
  platform: z.string(),
  url: z.string().url(),
  icon: z.string()
});

// Main content schema
const ContentSchema = z.object({
  topBar: z.object({
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
    socialLinks: z.array(SocialLinkSchema)
  }).optional(),
  header: z.object({
    logo: ImageSchema,
    siteName: z.string()
  }).optional(),
  navigation: z.object({
    links: z.array(LinkSchema)
  }).optional(),
  hero: z.object({
    backgroundImage: z.object({
      src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
      alt: z.string(),
      opacity: z.number().optional(),
      dimensions: z.object({
        width: z.number(),
        height: z.number(),
        recommended: z.string()
      }).optional()
    }).optional(),
    title: z.string(),
    subtitle: z.string(),
    ctaButton: LinkSchema
  }).optional(),
  welcome: z.object({
    title: z.string(),
    content: z.string(),
    image: ImageSchema
  }).optional(),
  tagline: z.object({
    text: z.string(),
    highlight: z.string(),
    description: z.string().optional()
  }).optional(),
  facilities: z.object({
    title: z.string(),
    subtitle: z.string(),
    backgroundImage: z.object({
      src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
      alt: z.string(),
      opacity: z.number().optional()
    }).optional(),
    items: z.array(FacilitySchema)
  }).optional(),
  propertySales: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string().optional(),
    backgroundImage: z.object({
      src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
      alt: z.string(),
      opacity: z.number().optional()
    }).optional(),
    properties: z.array(PropertySchema)
  }).optional(),
  reviews: z.object({
    title: z.string(),
    subtitle: z.string(),
    items: z.array(ReviewSchema)
  }).optional(),
  contact: z.object({
    title: z.string(),
    subtitle: z.string(),
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
    hours: z.string()
  }).optional(),
  bookingBanner: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string().optional(),
    backgroundImage: z.object({
      src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
      alt: z.string(),
      opacity: z.number().optional()
    }).optional(),
    ctaButton: LinkSchema.optional(),
    primaryButton: LinkSchema.optional(),
    secondaryButton: LinkSchema.optional()
  }).optional(),
  footer: z.object({
    companyName: z.string(),
    description: z.string(),
    copyright: z.string(),
    contact: z.object({
      phone: z.string(),
      email: z.string().email(),
      address: z.string()
    }).optional(),
    quickLinks: z.array(LinkSchema).optional(),
    socialLinks: z.array(SocialLinkSchema).optional()
  }).optional(),
  pages: z.object({
    about: z.object({
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        backgroundImage: z.object({
          src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
          alt: z.string(),
          opacity: z.number().optional()
        }).optional()
      }).optional()
    }).optional(),
    attractions: z.object({
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        backgroundImage: z.object({
          src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
          alt: z.string(),
          opacity: z.number().optional()
        }).optional()
      }).optional()
    }).optional(),
    contact: z.object({
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        backgroundImage: z.object({
          src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
          alt: z.string(),
          opacity: z.number().optional()
        }).optional()
      }).optional()
    }).optional(),
    directions: z.object({
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        backgroundImage: z.object({
          src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
          alt: z.string(),
          opacity: z.number().optional()
        }).optional()
      }).optional()
    }).optional(),
    facilities: z.object({
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        backgroundImage: z.object({
          src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
          alt: z.string(),
          opacity: z.number().optional()
        }).optional()
      }).optional()
    }).optional(),
    gallery: z.object({
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        backgroundImage: z.object({
          src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
          alt: z.string(),
          opacity: z.number().optional()
        }).optional()
      }).optional()
    }).optional(),
    reviews: z.object({
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        backgroundImage: z.object({
          src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
          alt: z.string(),
          opacity: z.number().optional()
        }).optional()
      }).optional()
    }).optional(),
    "static-caravans": z.object({
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        backgroundImage: z.object({
          src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
          alt: z.string(),
          opacity: z.number().optional()
        }).optional()
      }).optional()
    }).optional(),
    tariff: z.object({
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        backgroundImage: z.object({
          src: z.string().url().or(z.string().startsWith('/')).or(z.string().startsWith('#')),
          alt: z.string(),
          opacity: z.number().optional()
        }).optional()
      }).optional()
    }).optional()
  }).optional(),
  site_name: z.string().optional(),
  site_description: z.string().optional(),
  social_media: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    tripadvisor: z.string().optional()
  }).optional(),
  footer_logos: z.array(z.any()).optional(),
  _metadata: z.object({
    lastUpdated: z.string().optional(),
    version: z.number().optional()
  }).optional()
});

const debugHandler: APIRoute = async (context) => {
  try {
    // Check authentication
    const authResult = await requireAuth(context);
    if (authResult) {
      return authResult;
    }

    // Initialize storage
    initializeStorage(context);

    console.log('\n=== DEBUG VALIDATION ENDPOINT ===');

    // Load the current content from file
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    const contentPath = path.join(process.cwd(), 'content', 'site-content.json');
    
    const contentData = JSON.parse(await fs.readFile(contentPath, 'utf-8'));
    console.log('Loaded content keys:', Object.keys(contentData));

    // Test validation
    try {
      const result = ContentSchema.parse(contentData);
      console.log('✅ Validation PASSED');
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Content validation passed',
        contentKeys: Object.keys(contentData)
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('❌ Validation FAILED');
        console.log('Validation errors:', error.errors);
        
        const detailedErrors = error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
          code: err.code,
          received: err.received || 'undefined'
        }));
        
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'Content validation failed',
          errors: detailedErrors,
          contentKeys: Object.keys(contentData)
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      throw error;
    }

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return new Response(JSON.stringify({ 
      error: 'Debug endpoint failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST = secureAPIRoute(debugHandler, {
  requireAuth: true,
  requireCSRF: false,
  rateLimit: { window: 60 * 1000, requests: 10 }
});