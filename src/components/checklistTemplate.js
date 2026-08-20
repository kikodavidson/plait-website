// Shopify Build Process checklist.
// Edit the wording here freely — item `id` values are saved to BuildProject.completed_items,
// so never change an id once a build is in progress (rename the label instead).

export const CHECKLIST_SECTIONS = [
  {
    id: "discovery",
    title: "Discovery & Strategy",
    items: [
      { id: "discovery_kickoff", label: "Kickoff call completed" },
      { id: "discovery_brief", label: "Project brief signed off" },
      { id: "discovery_competitors", label: "Competitor stores reviewed" },
      { id: "discovery_audience", label: "Audience & positioning defined" },
      { id: "discovery_scope", label: "Scope & deliverables agreed" },
    ],
  },
  {
    id: "setup",
    title: "Store Setup",
    items: [
      { id: "setup_account", label: "Shopify account created" },
      { id: "setup_plan", label: "Plan tier confirmed with client" },
      { id: "setup_domain", label: "Custom domain connected" },
      { id: "setup_staff", label: "Staff accounts invited" },
      { id: "setup_payments", label: "Payment providers configured" },
      { id: "setup_shipping", label: "Shipping zones & rates set" },
      { id: "setup_taxes", label: "Tax settings reviewed" },
    ],
  },
  {
    id: "design",
    title: "Design",
    items: [
      { id: "design_moodboard", label: "Moodboard approved" },
      { id: "design_wireframes", label: "Wireframes approved" },
      { id: "design_homepage", label: "Homepage design signed off" },
      { id: "design_plp", label: "Collection / PLP design signed off" },
      { id: "design_pdp", label: "Product / PDP design signed off" },
      { id: "design_cart", label: "Cart & checkout design signed off" },
      { id: "design_mobile", label: "Mobile designs reviewed" },
    ],
  },
  {
    id: "development",
    title: "Development",
    items: [
      { id: "dev_theme", label: "Theme selected & installed" },
      { id: "dev_header", label: "Header & nav built" },
      { id: "dev_footer", label: "Footer built" },
      { id: "dev_homepage", label: "Homepage built" },
      { id: "dev_plp", label: "Collection pages built" },
      { id: "dev_pdp", label: "Product pages built" },
      { id: "dev_cart", label: "Cart drawer / page built" },
      { id: "dev_checkout", label: "Checkout customised" },
      { id: "dev_search", label: "Search & predictive search configured" },
      { id: "dev_apps", label: "Required apps installed" },
    ],
  },
  {
    id: "content",
    title: "Content & Products",
    items: [
      { id: "content_product_import", label: "Products imported" },
      { id: "content_images", label: "Product images uploaded" },
      { id: "content_copy", label: "Product copy written" },
      { id: "content_collections", label: "Collections organised" },
      { id: "content_pages", label: "Static pages written (About, FAQ, etc.)" },
      { id: "content_policies", label: "Policies added (privacy, refund, shipping, TOS)" },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    items: [
      { id: "test_devices", label: "Cross-device review completed" },
      { id: "test_browsers", label: "Cross-browser review completed" },
      { id: "test_checkout", label: "Test order placed end to end" },
      { id: "test_payments", label: "Payment flow verified" },
      { id: "test_emails", label: "Notification emails reviewed" },
      { id: "test_seo", label: "SEO & meta reviewed" },
      { id: "test_speed", label: "Performance / speed checked" },
    ],
  },
  {
    id: "launch",
    title: "Launch",
    items: [
      { id: "launch_client_review", label: "Final client review signed off" },
      { id: "launch_password_off", label: "Password page removed" },
      { id: "launch_dns", label: "DNS / domain live confirmed" },
      { id: "launch_go_live", label: "Store live" },
    ],
  },
  {
    id: "post_launch",
    title: "Post-launch",
    items: [
      { id: "post_handover", label: "Client handover session completed" },
      { id: "post_docs", label: "Editing guide / docs delivered" },
      { id: "post_monitor", label: "Monitoring set up for first week" },
      { id: "post_retrospective", label: "Internal retrospective completed" },
    ],
  },
];

export const ALL_ITEM_IDS = CHECKLIST_SECTIONS.flatMap((s) => s.items.map((i) => i.id));
export const TOTAL_ITEMS = ALL_ITEM_IDS.length;