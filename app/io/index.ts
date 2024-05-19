export type ShopifyStatus = "no known issues" | 'maintenance' | 'degraded' | 'partial outage' | 'outage'

export type OpenAIResponse = {
  overall_status: 'operational' | 'outage'
  statuses: [
    "no known issues",
    "maintenance",
    "degraded",
    "partial outage",
    "outage"
  ]
  services: {
    admin: ShopifyStatus
    checkout: ShopifyStatus
    reports_and_dashboards: ShopifyStatus
    storefront: ShopifyStatus
    api_and_mobile: ShopifyStatus
    third_party_services: ShopifyStatus
    support: ShopifyStatus
    point_of_sale: ShopifyStatus
    oxygen: ShopifyStatus
  }
}

export const MockStatusPage = `<div class="page full-width"> <div></div><div> <h1> All systems operational</h1></div><div> <p><a href="/login">Log in</a> to view detailed status for your store.</p></div><div> <a href="/incidents/recent"> View recent events</a></div><div> <div></div> <p> No known issues</p> <div></div> <p> Maintenance</p> <div></div> <p> Degraded</p> <div></div> <p> Partial Outage</p> <div></div> <p> Outage</p></div> <div> <p> Status per service areas</p> <div></div> <div> <div> <div></div> <div> <p>Admin</p> <p>No known issues</p></div></div></div> <div> <div> <div></div> <div> <p>Checkout</p> <p>No known issues</p></div></div></div> <div> <div> <div></div> <div> <p>Reports and Dashboards</p> <p>No known issues</p></div></div></div> <div></div> <div> <div> <div></div> <div> <p>Storefront</p> <p>No known issues</p></div></div></div> <div> <div> <div></div> <div> <p>API &amp; Mobile</p> <p>No known issues</p></div></div></div> <div> <div> <div></div> <div> <p>Third party services</p> <p>No known issues</p></div></div></div> <div></div> <div> <div> <div></div> <div> <p>Support</p> <p>No known issues</p></div></div></div> <div> <div> <div></div> <div> <p>Point of sale</p> <p>No known issues</p></div></div></div> <div> <div> <div></div> <div> <p>Oxygen</p> <p>No known issues</p></div></div></div></div> <div> <p> Some issues affecting a small percentage of stores may not be reflected here.</p> <p> Having trouble? <a href="https://help.shopify.com/questions">Contact support</a></p></div></div>`