// Shopify Build Process checklist.
// Edit the wording here freely — item `id` values are saved to BuildProject.completed_items,
// so never change an id once a build is in progress (rename the text instead).

export const CHECKLIST = [
  {
    id: "discovery",
    title: "Discovery & Strategy",
    items: [
      { id: "discovery_kickoff", text: "Kickoff call completed" },
      { id: "discovery_brief", text: "Project brief signed off" },
      { id: "discovery_competitors", text: "Competitor stores reviewed" },
      { id: "discovery_audience", text: "Audience & positioning defined" },
      { id: "discovery_scope", text: "Scope & deliverables agreed" },
    ],
  },
  {
    id: "setup",
    title: "Store Setup",
    items: [
      { id: "setup_account", text: "Shopify account created" },
      { id: "setup_plan", text: "Plan tier confirmed with client" },
      { id: "setup_domain", text: "Custom domain connected" },
      { id: "setup_staff", text: "Staff accounts invited" },
      { id: "setup_payments", text: "Payment providers configured" },
      { id: "setup_shipping", text: "Shipping zones & rates set" },
      { id: "setup_taxes", text: "Tax settings reviewed" },
    ],
  },
  {
    id: "design",
    title: "Design",
    items: [
      { id: "design_moodboard", text: "Moodboard approved" },
      { id: "design_wireframes", text: "Wireframes approved" },
      { id: "design_homepage", text: "Homepage design signed off" },
      { id: "design_plp", text: "Collection / PLP design signed off" },
      { id: "design_pdp", text: "Product / PDP design signed off" },
      { id: "design_cart", text: "Cart & checkout design signed off" },
      { id: "design_mobile", text: "Mobile designs reviewed" },
    ],
  },
  {
    id: "development",
    title: "Development",
    items: [
      { id: "dev_theme", text: "Theme selected & installed" },
      { id: "dev_header", text: "Header & nav built" },
      { id: "dev_footer", text: "Footer built" },
      { id: "dev_homepage", text: "Homepage built" },
      { id: "dev_plp", text: "Collection pages built" },
      { id: "dev_pdp", text: "Product pages built" },
      { id: "dev_cart", text: "Cart drawer / page built" },
      { id: "dev_checkout", text: "Checkout customised" },
      { id: "dev_search", text: "Search & predictive search configured" },
      { id: "dev_apps", text: "Required apps installed" },
    ],
  },
  {
    id: "content",
    title: "Content & Products",
    items: [
      { id: "content_product_import", text: "Products imported" },
      { id: "content_images", text: "Product images uploaded" },
      { id: "content_copy", text: "Product copy written" },
      { id: "content_collections", text: "Collections organised" },
      { id: "content_pages", text: "Static pages written (About, FAQ, etc.)" },
      { id: "content_policies", text: "Policies added (privacy, refund, shipping, TOS)" },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    items: [
      { id: "test_devices", text: "Cross-device review completed" },
      { id: "test_browsers", text: "Cross-browser review completed" },
      { id: "test_checkout", text: "Test order placed end to end" },
      { id: "test_payments", text: "Payment flow verified" },
      { id: "test_emails", text: "Notification emails reviewed" },
      { id: "test_seo", text: "SEO & meta reviewed" },
      { id: "test_speed", text: "Performance / speed checked" },
    ],
  },
  {
    id: "launch",
    title: "Launch",
    items: [
      { id: "launch_client_review", text: "Final client review signed off" },
      { id: "launch_password_off", text: "Password page removed" },
      { id: "launch_dns", text: "DNS / domain live confirmed" },
      { id: "launch_go_live", text: "Store live" },
    ],
  },
  {
    id: "post_launch",
    title: "Post-launch",
    items: [
      { id: "post_handover", text: "Client handover session completed" },
      { id: "post_docs", text: "Editing guide / docs delivered" },
      { id: "post_monitor", text: "Monitoring set up for first week" },
      { id: "post_retrospective", text: "Internal retrospective completed" },
    ],
  },
];

export const ALL_ITEM_IDS = CHECKLIST.flatMap((s) => s.items.map((i) => i.id));