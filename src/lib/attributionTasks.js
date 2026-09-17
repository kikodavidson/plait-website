// Master task list for the Attribution Tracker.
// Fixed constant — stored in code, not the database.
// applies_to decides which business types see each task.

export const TASK_LIST = {
  business_types: {
    shopify: {
      label: "Shopify",
      top_note: "The rule that matters most: one browser source and one server source per platform, sharing the same event ID. The official app plus a tracking app (or an old theme snippet) sending the same Purchase is the top reason numbers look inflated."
    },
    custom: {
      label: "Custom site",
      top_note: "The rule that matters most: the dataLayer is the foundation. If it's messy, every tag built on it is wrong. Get developers to push clean events first, then build browser and server tags from the same data with a shared event ID."
    },
    leadgen: {
      label: "Lead gen / SaaS",
      top_note: "The rule that matters most: a form fill isn't the goal. Capture click IDs with every lead, then send qualified, booked, and paid stages back to the platforms so they optimize for revenue instead of cheap junk leads."
    },
    app: {
      label: "Mobile app",
      top_note: "The rule that matters most: one source of truth for app events, usually the MMP. Sending the same event through the Meta SDK and your MMP (or Firebase and your MMP to Google) double counts. Pick one path per network."
    }
  },
  sections: [
    {
      order: 1,
      title: "Plan",
      tasks: [
        {
          id: "plan-map",
          task: "Write your event map: each event, where it fires, and what value it sends",
          how: "Ecommerce: ViewContent, AddToCart, InitiateCheckout, Purchase. Lead gen / SaaS: Lead, CompleteRegistration, StartTrial, Schedule, Subscribe. App: install, registration, trial, subscribe, purchase. Decide once whether revenue includes tax, shipping, or store fees.",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        },
        {
          id: "plan-truth",
          task: "Pick your source of truth and write down the gap you'll accept",
          how: "Shopify, your backend, your CRM, or App Store Connect and Play Console. Platforms will never match it exactly; 10 to 15% is a common working range.",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        },
        {
          id: "plan-utm",
          task: "Write your UTM naming rules",
          how: "Lowercase only. Fixed values for source and medium (e.g. `facebook` / `paid_social`). Share it with anyone who builds links.",
          applies_to: ["shopify", "custom", "leadgen"]
        }
      ]
    },
    {
      order: 2,
      title: "Accounts and setup",
      tasks: [
        {
          id: "acc-meta",
          task: "Create the Meta pixel in the client's Business Manager and verify the domain",
          how: "Business Settings, Brand Safety, Domains. Use the DNS TXT method. Give the agency partner access.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "acc-google",
          task: "Create the GA4 property, link it to Google Ads, and turn on auto tagging",
          how: "GA4 Admin, Product links. Auto tagging is in Google Ads account settings.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "acc-gmc",
          task: "Link Merchant Center to Google Ads",
          how: "The Google and YouTube Shopify app does this during setup.",
          applies_to: ["shopify", "custom"]
        },
        {
          id: "acc-other",
          task: "Create pixels for any other platforms in the plan",
          how: "TikTok, LinkedIn Insight Tag (key for B2B), Pinterest, Snap. Skip what you're not running.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "acc-shopapps",
          task: "Install the Meta, Google, and TikTok Shopify apps and connect each to the right account",
          how: "Double check the pixel and ad account selected in each app before finishing.",
          applies_to: ["shopify"]
        },
        {
          id: "acc-gtm",
          task: "Install Google Tag Manager on every page",
          how: "Head and body snippets on every template. For SaaS, include the app subdomain in the same container.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "acc-sgtm",
          task: "Set up a server GTM container on your own subdomain",
          how: "Stape is the fastest route. Point `data.yourdomain.com` at it so cookies are first party and last longer in Safari.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "acc-crm",
          task: "Get admin access to the CRM and billing tool",
          how: "HubSpot, Salesforce, Pipedrive, or GoHighLevel. Stripe, Chargebee, or Paddle for SaaS.",
          applies_to: ["leadgen"]
        },
        {
          id: "acc-mmp",
          task: "Add the iOS and Android apps to your MMP",
          how: "AppsFlyer, Adjust, Branch, or Singular. Save the dev key and app IDs.",
          applies_to: ["app"]
        },
        {
          id: "acc-applink",
          task: "Connect the app to Meta, Google (through Firebase), and Apple Ads",
          how: "Register the app in Meta for Developers and link it in Business Settings. Create a Firebase project linked to GA4 and Google Ads. Connect Apple Ads inside the MMP.",
          applies_to: ["app"]
        }
      ]
    },
    {
      order: 3,
      title: "Consent and privacy",
      tasks: [
        {
          id: "con-banner",
          task: "Turn on a consent banner that supports Google Consent Mode v2",
          how: "Shopify: Settings, Customer privacy. Custom and lead gen: Cookiebot, OneTrust, Termly, or Usercentrics.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "con-gate",
          task: "Make sure marketing tags and server events wait for consent",
          how: "Test that `ad_storage`, `analytics_storage`, `ad_user_data`, and `ad_personalization` update on accept. Pass the consent state to server events too.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "con-att",
          task: "Add the iOS tracking prompt with a pre prompt screen, and hold the SDK until it's answered",
          how: "Show it after onboarding, not on first launch. In AppsFlyer, use `waitForATTUserAuthorization` so the IDFA isn't lost on install.",
          applies_to: ["app"]
        },
        {
          id: "con-labels",
          task: "Update App Store privacy labels, the privacy manifest, and Google Play's Data safety form",
          how: "List every SDK that collects data. Apple rejects builds missing required privacy manifests.",
          applies_to: ["app"]
        },
        {
          id: "con-policy",
          task: "Update the privacy policy to list every tool that collects data",
          how: "Ad platforms, analytics, MMP, CRM, email and SMS tools.",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        }
      ]
    },
    {
      order: 4,
      title: "Browser and in app tracking",
      tasks: [
        {
          id: "br-shop-clean",
          task: "Remove any hard coded pixels from the theme",
          how: "Search theme files for `fbq(`, `gtag(`, `ttq.`. Leftovers plus an app means double counting.",
          applies_to: ["shopify"]
        },
        {
          id: "br-shop-custom",
          task: "Only if the apps don't cover something: add a custom pixel in Customer Events",
          how: "Settings, Customer events. Use `analytics.subscribe()` events like `checkout_completed`. It runs in a sandbox, so it can't read the page.",
          applies_to: ["shopify"]
        },
        {
          id: "br-datalayer",
          task: "Have developers push a dataLayer event for every step in your event map",
          how: "Use GA4 event names and structure (`view_item`, `add_to_cart`, `purchase`, `generate_lead`, `sign_up`). For ecommerce, push `{ecommerce: null}` before each event.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "br-tags",
          task: "Build a GTM tag for each event on each platform",
          how: "Meta, GA4, Google Ads, TikTok, LinkedIn. Every tag reads from the dataLayer, never from the page.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "br-once",
          task: "Block Purchase from firing again when the thank you page reloads",
          how: "Save the order ID in a cookie or local storage and skip the tag if it's already there.",
          applies_to: ["custom"]
        },
        {
          id: "br-spa",
          task: "Only if the site is a single page app: fire page views on route changes",
          how: "Use a History Change trigger in GTM. Most SaaS apps need this.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "br-lead",
          task: "Fire Lead only on confirmed success, including embedded forms and schedulers",
          how: "Never on button click. For HubSpot, Typeform, and Calendly iframes, listen for their success messages or use their native integrations.",
          applies_to: ["leadgen"]
        },
        {
          id: "br-signup",
          task: "Fire sign up and trial events from inside the product, with the user ID",
          how: "Your developers push these after the account is actually created.",
          applies_to: ["leadgen"]
        },
        {
          id: "br-am",
          task: "Turn on automatic advanced matching in Meta",
          how: "Events Manager, your pixel, Settings.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "app-sdk",
          task: "Install the MMP SDK on iOS and Android and set the customer user ID at login",
          how: "Initialize on launch with the latest SDK version.",
          applies_to: ["app"]
        },
        {
          id: "app-events",
          task: "Fire in app events with revenue, currency, and receipt validation",
          how: "Use MMP standard names like `af_start_trial`, `af_subscribe`, `af_purchase`. Fire on confirmed success, not taps.",
          applies_to: ["app"]
        },
        {
          id: "app-s2s",
          task: "Send subscription renewals and refunds to the MMP server to server",
          how: "Connect RevenueCat, or App Store Server Notifications and Google Play RTDN. Renewals don't happen in the app, so the SDK never sees them.",
          applies_to: ["app"]
        },
        {
          id: "app-skan",
          task: "Set your SKAN conversion value schema and enable it for each network",
          how: "Map early trial, subscribe, and revenue events. Keep it focused on what you optimize for.",
          applies_to: ["app"]
        },
        {
          id: "app-odm",
          task: "Turn on Google on device measurement for iOS",
          how: "Done through Firebase. Helps App campaigns without the IDFA.",
          applies_to: ["app"]
        },
        {
          id: "app-deeplink",
          task: "Set up universal links, app links, and MMP link templates",
          how: "Host the association files on your domain. Use MMP links (e.g. OneLink) in every ad, email, SMS, and web banner. Confirm deferred deep linking works.",
          applies_to: ["app"]
        },
        {
          id: "app-postbacks",
          task: "Turn on MMP postbacks and cost integrations for each network",
          how: "Choose which events go to each network, with revenue.",
          applies_to: ["app"]
        }
      ]
    },
    {
      order: 5,
      title: "Server side events",
      tasks: [
        {
          id: "sv-shop",
          task: "Set Meta data sharing to Maximum, and turn on server events in the Google and TikTok apps",
          how: "Meta app: Settings, Data sharing. Google: enhanced conversions. TikTok: highest data sharing level.",
          applies_to: ["shopify"]
        },
        {
          id: "sv-shop-overlap",
          task: "Only if you also use Elevar, Stape, or similar: turn off the overlapping feature in the native app",
          how: "One server source per platform. If Elevar sends Meta CAPI, the Meta app shouldn't.",
          applies_to: ["shopify"]
        },
        {
          id: "sv-capi",
          task: "Send Meta, TikTok, and GA4 events through the server container",
          how: "Forward each browser event to sGTM and fire the Meta CAPI, TikTok Events API, and GA4 tags there. Set `action_source` and `event_source_url`.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "sv-backend",
          task: "Send money events from the backend when payment is confirmed",
          how: "Custom ecommerce: order created webhook. SaaS: Stripe `invoice.paid`. This fires even if the thank you page never loads.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "sv-ec",
          task: "Turn on Google Ads enhanced conversions",
          how: "For lead gen, use enhanced conversions for leads.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "sv-userdata",
          task: "Send hashed customer data with every server event",
          how: "Email, phone, name, city, state, zip, country (SHA256, lowercase and trimmed), plus unhashed IP, user agent, fbp, fbc, and your user or lead ID as `external_id`.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "sv-fbc",
          task: "Save fbc, fbp, and click IDs on each order or lead record",
          how: "If `fbclid` is in the URL and there's no `_fbc` cookie, build one: `fb.1.{timestamp}.{fbclid}`. Backend events need these later.",
          applies_to: ["custom", "leadgen"]
        }
      ]
    },
    {
      order: 6,
      title: "Deduplication",
      tasks: [
        {
          id: "dd-id",
          task: "Send the same event ID and event name from browser and server",
          how: "Create one ID per action in GTM and pass it as `eventID` on the pixel and `event_id` on the server. Order or lead ID works for money events.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "dd-shop",
          task: "Confirm only one source sends each event to each platform",
          how: "Check the Meta, Google, and TikTok apps, any tracking app, custom pixels, and theme code.",
          applies_to: ["shopify"]
        },
        {
          id: "app-onepath",
          task: "Pick one path per network for app events and turn off the other",
          how: "MMP or Meta SDK for Meta, not both. Firebase or MMP import for Google, not both.",
          applies_to: ["app"]
        },
        {
          id: "dd-txn",
          task: "Pass the order or lead ID as transaction_id to GA4 and Google Ads",
          how: "Both drop repeats with the same ID.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "dd-primary",
          task: "Set only one Primary Google Ads conversion per goal",
          how: "If both a Google tag version and a GA4 import exist, make one Secondary. Micro events stay Secondary.",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        },
        {
          id: "dd-stage",
          task: "Make sure CRM syncs send each stage only once per lead",
          how: "Status changes back and forth shouldn't refire the same stage.",
          applies_to: ["leadgen"]
        },
        {
          id: "dd-check",
          task: "Confirm deduplication in Meta Events Manager",
          how: "Open each key event in Overview. Browser and server both received, deduplicated, no warnings.",
          applies_to: ["shopify", "custom", "leadgen"]
        }
      ]
    },
    {
      order: 7,
      title: "Platform settings",
      tasks: [
        {
          id: "pl-goals",
          task: "Set conversion counting and windows in Google Ads",
          how: "Purchases count Every, leads count One. B2B often needs a 60 to 90 day click window.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "pl-ga4",
          task: "Set GA4 key events, 14 month retention, an internal traffic filter, and referral exclusions",
          how: "Referral exclusions: PayPal, Stripe, Klarna, Afterpay, Calendly, and similar, so they don't steal credit.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "pl-ga4app",
          task: "Mark app key events in GA4 and set retention to 14 months",
          how: "",
          applies_to: ["app"]
        },
        {
          id: "pl-cross",
          task: "Set up cross domain tracking for any other domain in the journey",
          how: "GA4 data stream, Configure your domains. Include the app subdomain and any checkout or booking domain.",
          applies_to: ["custom", "leadgen"]
        },
        {
          id: "pl-catalog",
          task: "Fix the catalog match rate if it's under 90%",
          how: "Events Manager shows it. On Shopify, variant vs product ID is the usual mismatch.",
          applies_to: ["shopify", "custom"]
        },
        {
          id: "pl-app",
          task: "Set MMP attribution windows and turn on fraud protection",
          how: "Align windows with each network. Protect360 or equivalent.",
          applies_to: ["app"]
        }
      ]
    },
    {
      order: 8,
      title: "UTMs and attribution",
      tasks: [
        {
          id: "ut-ads",
          task: "Add UTM parameters to every Meta, TikTok, and LinkedIn ad",
          how: "Meta example: `utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}`",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "ut-owned",
          task: "Tag every email and SMS link",
          how: "Turn on auto UTMs in Klaviyo or your tool. For apps, use MMP links.",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        },
        {
          id: "ut-persist",
          task: "Click through each ad and confirm click IDs and UTMs survive to the conversion",
          how: "Watch for redirects, popups, or domain changes stripping `fbclid`, `gclid`, `ttclid`, or UTMs.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "ut-survey",
          task: "Add a \"How did you hear about us?\" question",
          how: "Post purchase, on the lead form, or in app onboarding.",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        }
      ]
    },
    {
      order: 9,
      title: "CRM and offline conversions",
      tasks: [
        {
          id: "lg-hidden",
          task: "Add hidden fields to every form for UTMs and click IDs",
          how: "gclid, fbclid, fbc, fbp, ttclid, li_fat_id, and UTMs, mapped to CRM properties.",
          applies_to: ["leadgen"]
        },
        {
          id: "lg-stages",
          task: "Define CRM stages and give each one a value",
          how: "Lead, qualified, booked, opportunity, closed. Rough values are fine.",
          applies_to: ["leadgen"]
        },
        {
          id: "lg-instant",
          task: "Sync Meta and LinkedIn lead form ads to the CRM",
          how: "Keep the platform lead ID so stage updates can match.",
          applies_to: ["leadgen"]
        },
        {
          id: "lg-offline",
          task: "Send qualified and closed stages back to Google, Meta, and LinkedIn",
          how: "Google Ads offline conversions, Meta CRM integration through CAPI, LinkedIn Conversions API. HubSpot and Salesforce have native connectors.",
          applies_to: ["leadgen"]
        },
        {
          id: "lg-link",
          task: "Link product users to CRM contacts so trial to paid ties back to the campaign",
          how: "Match on email or user ID.",
          applies_to: ["leadgen"]
        }
      ]
    },
    {
      order: 10,
      title: "Test",
      tasks: [
        {
          id: "qa-web",
          task: "Walk the full funnel in Meta Test Events, GA4 DebugView, and your debugger",
          how: "Custom and lead gen: GTM web and server Preview. Shopify: the test option in Customer events. Check each event fires once with the right values and matching event IDs.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "qa-order",
          task: "Place a real test order, confirm it in every platform, then refund it",
          how: "",
          applies_to: ["shopify", "custom"]
        },
        {
          id: "qa-lead",
          task: "Submit a test lead, move it through every CRM stage, and run a test payment",
          how: "Confirm click IDs land in the CRM and each stage reaches every platform once.",
          applies_to: ["leadgen"]
        },
        {
          id: "qa-blocker",
          task: "Repeat a test with an ad blocker on, then with consent declined",
          how: "Ad blocker: browser events drop, server events still land. Declined: marketing tags stay off.",
          applies_to: ["shopify", "custom", "leadgen"]
        },
        {
          id: "qa-app",
          task: "Run the MMP SDK test and a TestFlight purchase on iOS and Android",
          how: "Register test devices. Confirm install, events, and revenue arrive, and sandbox revenue isn't counted.",
          applies_to: ["app"]
        },
        {
          id: "qa-appdl",
          task: "Test deep links with the app installed and not installed",
          how: "",
          applies_to: ["app"]
        },
        {
          id: "qa-reconcile",
          task: "After 7 days, compare platform numbers to your source of truth",
          how: "Way over usually means duplicates. Way under usually means missing server events or postbacks.",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        }
      ]
    },
    {
      order: 11,
      title: "Maintain",
      tasks: [
        {
          id: "mo-weekly",
          task: "Check diagnostics and match quality every week",
          how: "Meta Events Manager, Google Ads conversion diagnostics, MMP dashboard.",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        },
        {
          id: "mo-retest",
          task: "Retest after every site, app, form, or CRM change",
          how: "New apps, theme updates, SDK updates, and renamed CRM fields break tracking quietly.",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        },
        {
          id: "mo-alerts",
          task: "Set alerts for drops in conversion volume",
          how: "GA4 custom insights or MMP alerts.",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        },
        {
          id: "mo-doc",
          task: "Keep a doc of what's installed, where, and who has access",
          how: "",
          applies_to: ["shopify", "custom", "leadgen", "app"]
        }
      ]
    }
  ]
};

export const BUSINESS_TYPES = TASK_LIST.business_types;
export const SECTIONS = TASK_LIST.sections;

// Sections (in order) with only the tasks that apply to the given business type.
// Sections with no matching tasks are hidden.
export function sectionsFor(businessType) {
  return SECTIONS.map((s) => ({
    ...s,
    tasks: s.tasks.filter((t) => t.applies_to.includes(businessType)),
  })).filter((s) => s.tasks.length > 0);
}

export function totalTasksFor(businessType) {
  return sectionsFor(businessType).reduce((n, s) => n + s.tasks.length, 0);
}