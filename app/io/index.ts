const randomNumber = Math.ceil(Math.random() * 5)

export type ShopifyStatus = 'operational' | 'degraded performance' | 'partial outage' | 'major outage' | 'maintenance'

export type OpenAIResponse = {
  active_issue: string
  overall_status: 'operational' | 'active issue'
  statuses: [
    'operational',
    'degraded performance',
    'partial outage',
    'major outage',
    'maintenance'
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

export type SlackElementBlock = {
  type: string
  text?: string
  url?: string
  style?: {
    italic?: true
    bold?: true
  }
}

export type SlackBlock = {
  type: string
  elements?: SlackElementBlock[]
}

export const MockStatusPageWithIssues = `<div class="page full-width"> <div></div><div> <h1> ${randomNumber} active issue${randomNumber > 1 ? 's' : ''}</h1></div><div> <p><a href="/login">Log in</a> to view detailed status for your store.</p></div><div> <a href="/incidents/recent"> View recent events</a></div><div> <div></div> <p> operational</p> <div></div> <p> Maintenance</p> <div></div> <p> Degraded</p> <div></div> <p> Partial Outage</p> <div></div> <p> Outage</p></div> <div> <p> Status per service areas</p> <div></div> <div> <div> <div></div> <div> <p>Admin</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>Checkout</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>Reports and Dashboards</p> <p>operational</p></div></div></div> <div></div> <div> <div> <div></div> <div> <p>Storefront</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>API &amp; Mobile</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>Third party services</p> <p>operational</p></div></div></div> <div></div> <div> <div> <div></div> <div> <p>Support</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>Point of sale</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>Oxygen</p> <p>operational</p></div></div></div></div> <div> <p> Some issues affecting a small percentage of stores may not be reflected here.</p> <p> Having trouble? <a href="https://help.shopify.com/questions">Contact support</a></p></div></div>`
export const MockStatusPageNoIssues = `<div class="page full-width"> <div></div><div> <h1> No active issues</h1></div><div> <p><a href="/login">Log in</a> to view detailed status for your store.</p></div><div> <a href="/incidents/recent"> View recent events</a></div><div> <div></div> <p> operational</p> <div></div> <p> Maintenance</p> <div></div> <p> Degraded</p> <div></div> <p> Partial Outage</p> <div></div> <p> Outage</p></div> <div> <p> Status per service areas</p> <div></div> <div> <div> <div></div> <div> <p>Admin</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>Checkout</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>Reports and Dashboards</p> <p>operational</p></div></div></div> <div></div> <div> <div> <div></div> <div> <p>Storefront</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>API &amp; Mobile</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>Third party services</p> <p>operational</p></div></div></div> <div></div> <div> <div> <div></div> <div> <p>Support</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>Point of sale</p> <p>operational</p></div></div></div> <div> <div> <div></div> <div> <p>Oxygen</p> <p>operational</p></div></div></div></div> <div> <p> Some issues affecting a small percentage of stores may not be reflected here.</p> <p> Having trouble? <a href="https://help.shopify.com/questions">Contact support</a></p></div></div>`

export const MockOpenAIResponse:OpenAIResponse = {
  active_issue: 'Shopify dashboard is down',
  overall_status: 'active issue',
  statuses: [
    'operational',
    'degraded performance',
    'partial outage',
    'major outage',
    'maintenance'
  ],
  services: {
    admin: 'operational',
    checkout: 'operational',
    reports_and_dashboards: 'operational',
    storefront: 'operational',
    api_and_mobile: 'operational',
    third_party_services: 'operational',
    support: 'operational',
    point_of_sale: 'operational',
    oxygen: 'operational'
  }
}