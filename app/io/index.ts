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

export const MockStatusPageWithIssues = `Shopify Status<div><div><a>  </a><div><a>My Shopify Status</a></div></div><div>Detailed status for your store can be viewed<a>here</a>.</div></div>x<div><div>Visit our<a>support site</a>.</div></div><div><div><h2>All Systems Operational</h2></div><div><div><div><div><span>Admin</span><span>Operational</span></div></div><div><div><span>Checkout</span><span>Degraded Performance</span></div></div><div><div><span>Reports and Dashboards</span><span>Operational</span></div></div><div><div><span>Storefront</span><span>Operational</span></div></div><div><div><span>API &amp; Mobile</span><span>Operational</span></div></div><div><div><span>Third party services</span><span>Operational</span></div></div><div><div><span>Support</span><span>Operational</span></div></div><div><div><span>Point of Sale</span><span>Operational</span></div></div><div><div><span>Oxygen</span><span>Operational</span></div></div></div><div><div>Operational</div><div>Degraded Performance</div><div>Partial Outage</div><div>Major Outage</div><div>Maintenance</div></div></div><div><h2>Past Incidents</h2><div><div>Oct<var>7</var>,<var>2025</var></div><p>No incidents reported today.</p></div><div><div>Oct<var>6</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Oct<var>5</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Oct<var>4</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Oct<var>3</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Oct<var>2</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Oct<var>1</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>30</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>29</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>28</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>27</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>26</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>25</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>24</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>23</var>,<var>2025</var></div><p>No incidents reported.</p></div></div><div><a><span>←</span>Incident History</a><span><a>Powered by Atlassian Statuspage</a></span></div></div><div><div><div><div><p>Some issues affecting a small percentage of stores may not be reflected here.</p></div><div><p>Having trouble?<a>Contact support</a></p></div></div></div></div>`
export const MockStatusPageNoIssues = `Shopify Status<div><div><a>  </a><div><a>My Shopify Status</a></div></div><div>Detailed status for your store can be viewed<a>here</a>.</div></div>x<div><div>Visit our<a>support site</a>.</div></div><div><div><h2>All Systems Operational</h2></div><div><div><div><div><span>Admin</span><span>Operational</span></div></div><div><div><span>Checkout</span><span>Operational</span></div></div><div><div><span>Reports and Dashboards</span><span>Operational</span></div></div><div><div><span>Storefront</span><span>Operational</span></div></div><div><div><span>API &amp; Mobile</span><span>Operational</span></div></div><div><div><span>Third party services</span><span>Operational</span></div></div><div><div><span>Support</span><span>Operational</span></div></div><div><div><span>Point of Sale</span><span>Operational</span></div></div><div><div><span>Oxygen</span><span>Operational</span></div></div></div><div><div>Operational</div><div>Degraded Performance</div><div>Partial Outage</div><div>Major Outage</div><div>Maintenance</div></div></div><div><h2>Past Incidents</h2><div><div>Oct<var>7</var>,<var>2025</var></div><p>No incidents reported today.</p></div><div><div>Oct<var>6</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Oct<var>5</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Oct<var>4</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Oct<var>3</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Oct<var>2</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Oct<var>1</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>30</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>29</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>28</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>27</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>26</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>25</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>24</var>,<var>2025</var></div><p>No incidents reported.</p></div><div><div>Sep<var>23</var>,<var>2025</var></div><p>No incidents reported.</p></div></div><div><a><span>←</span>Incident History</a><span><a>Powered by Atlassian Statuspage</a></span></div></div><div><div><div><div><p>Some issues affecting a small percentage of stores may not be reflected here.</p></div><div><p>Having trouble?<a>Contact support</a></p></div></div></div></div>`

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