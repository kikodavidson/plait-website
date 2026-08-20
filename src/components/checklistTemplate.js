// Shopify build checklist template.
// Edit this file to change the checklist. IDs are what get saved, so never
// rename an ID once a project has used it. Change the text freely.

export const CHECKLIST = [
  {
    id: "assets",
    title: "Owner assets and access",
    note: "The build waits until this is in hand.",
    items: [
      { id: "assets_collab", text: "Collaborator access to the store" },
      { id: "assets_dns", text: "Domain registrar or DNS access" },
      { id: "assets_email", text: "Email platform access" },
      { id: "assets_ads", text: "Ad accounts, Business Manager, GA4, Search Console" },
      { id: "assets_logo", text: "Logo in SVG or transparent PNG, plus favicon" },
      { id: "assets_brand", text: "Colors and fonts" },
      { id: "assets_photos", text: "Product photos, 3 to 5 angles each, one aspect ratio" },
      { id: "assets_lifestyle", text: "Lifestyle photos and video" },
      { id: "assets_proof", text: "Reviews, testimonials, press logos" },
      { id: "assets_about", text: "About story and team photos" },
      { id: "assets_sheet", text: "Product sheet filled in, one row per variant" },
      { id: "assets_pricing", text: "Price, compare at price, cost per item" },
      { id: "assets_skus", text: "SKUs, barcodes, inventory counts" },
      { id: "assets_dims", text: "Weight and package dimensions" },
      { id: "assets_shipping_rules", text: "Shipping rates and free shipping threshold" },
      { id: "assets_returns", text: "Returns window and processing time" },
      { id: "assets_scope", text: "International, subscriptions, wholesale, local pickup" }
    ]
  },
  {
    id: "owner",
    title: "Owner tasks I verify",
    note: "Sent at kickoff. I confirm each one before launch.",
    items: [
      { id: "owner_plan", text: "Shopify plan selected" },
      { id: "owner_payments", text: "Shopify Payments activated with bank details and tax ID" },
      { id: "owner_tax", text: "Tax registration and nexus handled" },
      { id: "owner_policies", text: "Store policies written or approved" },
      { id: "owner_theme", text: "Premium theme purchased on their account" },
      { id: "owner_pricing", text: "Pricing and launch offer approved" }
    ]
  },
  {
    id: "theme",
    title: "Theme",
    note: "Define needs first, then pick. Never the reverse.",
    items: [
      { id: "theme_needs", text: "Required features listed: menu, quick add, bundles, filtering, subscriptions" },
      { id: "theme_shortlist", text: "3 themes shortlisted and tested on mobile" },
      { id: "theme_os2", text: "Online Store 2.0 with sections on every page" },
      { id: "theme_updated", text: "Updated within the last 12 months" },
      { id: "theme_speed", text: "Demo run through PageSpeed" },
      { id: "theme_apps", text: "Built in features that replace paid apps noted" },
      { id: "theme_copy", text: "Theme duplicated before editing" }
    ]
  },
  {
    id: "architecture",
    title: "Architecture",
    items: [
      { id: "arch_sitemap", text: "Sitemap" },
      { id: "arch_collections", text: "Collection structure" },
      { id: "arch_nav", text: "Main nav capped at 5 to 7 items" },
      { id: "arch_footer", text: "Footer menus" },
      { id: "arch_urls", text: "URL handles set" },
      { id: "arch_redirects", text: "Redirect map from old URLs if this is a rebuild" }
    ]
  },
  {
    id: "pages",
    title: "Pages",
    items: [
      { id: "pages_home", text: "Home" },
      { id: "pages_collections", text: "Collections" },
      { id: "pages_products", text: "Product templates, more than one if products differ" },
      { id: "pages_cart", text: "Cart or drawer" },
      { id: "pages_about", text: "About, Contact, FAQ" },
      { id: "pages_policies", text: "Policy pages published and linked in footer" },
      { id: "pages_blog", text: "Blog with starting posts" },
      { id: "pages_landing", text: "Landing page template for paid traffic" },
      { id: "pages_404", text: "404 with a way back into the store" }
    ]
  },
  {
    id: "conversion",
    title: "Conversion layer",
    items: [
      { id: "conv_hero", text: "Hero with one offer and one button" },
      { id: "conv_value", text: "Value strip: shipping, guarantee, returns" },
      { id: "conv_reviews", text: "Reviews on product and home" },
      { id: "conv_upsell", text: "Cross sell or upsell placement" },
      { id: "conv_capture", text: "Email capture on site and in popup" },
      { id: "conv_mobile", text: "Mobile add to cart flow tested first" }
    ]
  },
  {
    id: "apps",
    title: "Apps",
    note: "Every app costs money and speed.",
    items: [
      { id: "apps_reviews", text: "Reviews" },
      { id: "apps_email", text: "Email and SMS" },
      { id: "apps_bundles", text: "Bundles or subscriptions if needed" },
      { id: "apps_search", text: "Search and filtering if the catalog is large" },
      { id: "apps_consent", text: "Cookie consent" },
      { id: "apps_cleanup", text: "Trials uninstalled and leftover code removed" }
    ]
  },
  {
    id: "tracking",
    title: "Tracking",
    note: "Set up before launch. Rebuilding attribution later is painful.",
    items: [
      { id: "track_ga4", text: "GA4 and GTM" },
      { id: "track_events", text: "Purchase, add to cart, begin checkout firing" },
      { id: "track_meta", text: "Meta pixel and Conversions API" },
      { id: "track_google", text: "Google Ads conversions and Merchant Center feed" },
      { id: "track_gsc", text: "Search Console verified, sitemap submitted" },
      { id: "track_utm", text: "UTM convention documented" },
      { id: "track_recording", text: "Session recording installed" },
      { id: "track_verify", text: "Every event verified with a real test order" }
    ]
  },
  {
    id: "email",
    title: "Email and SMS",
    items: [
      { id: "email_sync", text: "Platform connected with full data sync" },
      { id: "email_dns", text: "Sending domain authenticated" },
      { id: "email_welcome", text: "Welcome flow" },
      { id: "email_cart", text: "Abandoned cart flow" },
      { id: "email_browse", text: "Browse abandon flow" },
      { id: "email_post", text: "Post purchase flow" },
      { id: "email_winback", text: "Winback flow" },
      { id: "email_stock", text: "Back in stock and review request" },
      { id: "email_brand", text: "Templates matched to the site" }
    ]
  },
  {
    id: "launch",
    title: "QA and launch",
    items: [
      { id: "qa_mobile", text: "Every page on mobile first, then desktop" },
      { id: "qa_order", text: "Full purchase completed and refunded" },
      { id: "qa_discount", text: "Discount code tested" },
      { id: "qa_forms", text: "Contact form delivering" },
      { id: "qa_placeholder", text: "All demo and placeholder content removed" },
      { id: "qa_pricing", text: "Pricing verified against the product sheet" },
      { id: "qa_speed", text: "Mobile load under 3 seconds" },
      { id: "qa_seo", text: "Meta titles and descriptions written" },
      { id: "qa_redirects", text: "301 redirects live and tested" },
      { id: "qa_password", text: "Password page removed" },
      { id: "qa_live_order", text: "Live test order placed on the real domain" },
      { id: "qa_analytics", text: "Analytics receiving live data" },
      { id: "qa_approval", text: "Client walkthrough and written approval" },
      { id: "qa_handoff", text: "Handoff doc sent" }
    ]
  },
  {
    id: "post",
    title: "First 30 days",
    items: [
      { id: "post_404", text: "Search Console watched for 404 spikes" },
      { id: "post_match", text: "Tracked purchases match Shopify order count" },
      { id: "post_recordings", text: "Session recordings reviewed" },
      { id: "post_devices", text: "Mobile and desktop conversion rate compared" },
      { id: "post_fixes", text: "Top 3 drop off points fixed" },
      { id: "post_sprint", text: "First optimization sprint scheduled" }
    ]
  }
];

export const ALL_ITEM_IDS = CHECKLIST.flatMap((s) => s.items.map((i) => i.id));