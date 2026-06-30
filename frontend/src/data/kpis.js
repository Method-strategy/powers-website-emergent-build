/**
 * Manufacturing KPIs dataset — categorized metrics library mirrored
 * from /manufacturing-metrics/. Each KPI carries a definition and
 * the canonical formula POWERS uses with clients.
 */

export const kpiCategories = [
  {
    slug: 'top',
    title: 'Top Manufacturing KPIs',
    intro: 'Cross-cutting indicators that show up in nearly every operations conversation \u2014 productivity, quality, delivery, and the financial signal behind them.',
    kpis: [
      { name: 'Production Volume',                        def: 'Reflects the number of units manufactured during a set time frame, essential for benchmarking manufacturing efficiency.', formula: 'Production volume = Total # of products manufactured during a specified time frame' },
      { name: 'Production Downtime',                       def: 'Measures non-operational time, considering both planned and unplanned instances.',                                       formula: 'Production downtime = Sum of all downtime during a specified time frame' },
      { name: 'Production Costs',                          def: 'Combines all direct and indirect costs related to manufacturing, including raw materials, labor, rent, and overhead.',  formula: 'Production costs = Direct labor cost + direct material cost + overhead costs' },
      { name: 'Overall Equipment Effectiveness (OEE)',     def: 'Evaluates the percentage of productive time, considering quality, performance at full capacity, and availability.',     formula: 'OEE = Performance \u00d7 Quality \u00d7 Availability' },
      { name: 'Overall Operations Effectiveness (OOE)',    def: 'Similar to OEE, but includes maintenance time in availability, reflecting total operational effectiveness.',             formula: 'OOE = Performance \u00d7 Quality \u00d7 Availability' },
      { name: 'Total Effective Equipment Performance (TEEP)', def: 'Assesses how a plant performs against a theoretical 24/7, 365-day capacity \u2014 a key utilization metric.',          formula: 'TEEP = Performance \u00d7 Quality \u00d7 Availability' },
      { name: 'Capacity Utilization',                      def: 'Indicates the percentage of the plant\u2019s total available capacity being used.',                                       formula: 'Capacity utilization = (Total capacity used / total available production capacity) \u00d7 100' },
      { name: 'Defect Density',                            def: 'Monitors the ratio of defective to total products, which can affect profitability and customer satisfaction.',           formula: 'Defect density = # of defective units / total units produced' },
      { name: 'On-Time Delivery',                          def: 'Quantifies the percentage of products delivered on time, reflecting how well the company is meeting customer demand.',   formula: 'On-time delivery = On-time units delivered / total delivered units' },
      { name: 'First Time Right (FTR)',                    def: 'Represents a goal to complete processes right the first time, emphasizing efficient and lean production.',              formula: 'FTR = Total # of good units / total # of units in process' },
      { name: 'Inventory Turns',                           def: 'Examines the usage and replacement rate of stock, helping to minimize inventories in lean manufacturing.',               formula: 'Inventory turns = COGS / average inventory during a specified time frame' },
      { name: 'Maintenance Costs',                         def: 'Considers all costs for maintaining and repairing production equipment.',                                                  formula: 'Maintenance cost per unit = Total maintenance costs / # of products produced during the same time frame' },
    ],
  },
  {
    slug: 'efficiency',
    title: 'Efficiency KPIs',
    intro: 'The optimal use of resources and cost minimization \u2014 aligned with lean principles.',
    kpis: [
      { name: 'Throughput',                                def: 'Volume of good units produced over a specific time frame.',                                                              formula: 'Throughput rate = Total # of good units produced / specified time frame' },
      { name: 'Work in Process (WIP)',                     def: 'Goods that are in mid-production, including associated raw materials, labor, and overhead costs.',                       formula: 'WIP = (Beginning WIP + manufacturing costs) \u2013 cost of goods manufactured' },
      { name: 'Schedule / Production Attainment',          def: 'Compares actual manufactured goods to planned output, surfacing deviations and improvement opportunities.',              formula: 'Schedule attainment = (Actual production output / target production output) \u00d7 100' },
      { name: 'Scrap Material Value',                      def: 'Value derived from excess material left over after production, reflecting material-usage efficiency.',                   formula: 'Scrap material value = Amount earned on disposing scrap \u2013 disposal cost' },
      { name: 'On-Standard Operating Efficiency',          def: 'Actual performance against estimated labor costs.',                                                                       formula: 'On-standard efficiency = # of products at or below estimated cost / total # of products in same period' },
      { name: 'Asset Utilization',                         def: 'How efficiently assets are used in production \u2014 the average return on assets.',                                       formula: 'Asset utilization = Revenue / ((value of assets at start + value of assets at end) / 2) \u00d7 100' },
    ],
  },
  {
    slug: 'cost-profitability',
    title: 'Cost & Profitability KPIs',
    intro: 'Tracking from unit cost up through EBITDA \u2014 the financial signal behind manufacturing performance.',
    kpis: [
      { name: 'Manufacturing Cost ex-Materials per Unit',  def: 'Measures all manufacturing costs except materials per unit, focusing on labor and overhead.',                            formula: 'Cost ex-materials/unit = (Total manufacturing costs \u2013 cost of materials) / total units manufactured' },
      { name: 'Manufacturing Cost as % of Revenue',        def: 'Compares total production costs to revenue, surfacing cost-saving opportunities.',                                       formula: 'Manufacturing cost % = Total manufacturing costs / overall revenue' },
      { name: 'Net Operating Profit',                      def: 'Profitability after cost of goods sold, operating expenses, interest, and taxes.',                                       formula: 'Net operating profit = (Revenue \u2013 operating expenses) \u2013 interest and taxes' },
      { name: 'Average Unit Contribution Margin',          def: 'Profit each unit generates after variable costs.',                                                                       formula: 'Avg unit contribution = (Total revenues \u2013 total variable costs) / total volume of production' },
      { name: 'Return on Net Assets (RONA)',               def: 'How well a company leverages its assets to create profits.',                                                              formula: 'RONA = Net income / (value of fixed assets + net working capital)' },
      { name: 'Energy Cost per Unit',                      def: 'Energy used to manufacture each unit, affecting profitability.',                                                          formula: 'Energy cost/unit = Sum of all energy costs / # of units manufactured' },
      { name: 'Cash-to-Cash Cycle Time',                   def: 'Time it takes to convert inventory investments into cash flow.',                                                          formula: 'C2C = Days inventory outstanding + days sales outstanding \u2013 days payables outstanding' },
      { name: 'EBITDA',                                    def: 'Operational profitability, often used by investors for company comparison.',                                              formula: 'EBITDA = Net income + interest + taxes + depreciation + amortization' },
      { name: 'Employee Turnover',                         def: 'Attrition rate \u2014 assesses recruitment, training cost, and engagement.',                                               formula: 'Turnover = (# of separations / average headcount) \u00d7 100' },
    ],
  },
  {
    slug: 'compliance',
    title: 'Compliance KPIs',
    intro: 'Ensuring adherence to environmental, health-and-safety, and business-practice regulations.',
    kpis: [
      { name: 'Reported Health & Safety Incidents',        def: 'Health and safety incidents reported to OSHA.',                                                                          formula: '= # of H&S incidents reported during a specified time frame' },
      { name: 'Health & Safety Incidence Rate (TCIR)',     def: 'Work-related injuries per 100 full-time workers per year.',                                                              formula: 'TCIR = (# of OSHA-recorded injuries \u00d7 200,000) / total employee hours worked' },
      { name: 'Reportable Environmental Incidents',        def: 'Environmental incidents reported to the EPA \u2014 air, water, and recycling.',                                            formula: '= # of EPA-reported incidents during specified period' },
      { name: 'Non-Compliance Events per Year',            def: 'Times a plant failed to comply with guidelines over a year.',                                                              formula: '= # of non-compliance events in a 12-month period' },
      { name: 'Failed Audit Rate',                         def: 'Frequency of failed safety audits.',                                                                                     formula: 'Failed audit rate = # of failed audits / total # of audits in the same period' },
    ],
  },
  {
    slug: 'maintenance',
    title: 'Maintenance KPIs',
    intro: 'Maintenance efficiency \u2014 the metrics that reveal equipment reliability and the cost behind it.',
    kpis: [
      { name: 'Maintenance Unit Cost',                     def: 'Cost of maintaining and repairing equipment per unit produced.',                                                          formula: '= Total maintenance costs / # of products produced in same time frame' },
      { name: 'MTBF (Mean Time Between Failures)',         def: 'Average time between equipment failures \u2014 asset reliability signal.',                                                 formula: 'MTBF = Operating time / # of failures' },
      { name: 'MTTF (Mean Time To Failure)',               def: 'For non-repairable components \u2014 electronics, etc.',                                                                   formula: 'MTTF = Operating time / # of failures' },
      { name: 'Percentage Maintenance Planned (PMP)',      def: 'Actual versus planned maintenance hours.',                                                                                formula: 'PMP = (Planned maintenance hours / total maintenance hours) \u00d7 100' },
      { name: 'Planned vs. Emergency Work Orders',         def: 'Ratio of planned to emergency maintenance work.',                                                                         formula: '= (Planned maintenance hours / unplanned maintenance hours) \u00d7 100' },
      { name: 'Unscheduled Downtime',                      def: 'Unexpected downtime of equipment \u2014 a reliability signal.',                                                            formula: '= Sum of all unscheduled downtime during a specified time frame' },
      { name: 'Avoided Costs',                             def: 'Savings from preventive maintenance that prevents costly repairs and downtime.',                                          formula: 'Avoided costs = (Assumed repair cost + production losses) \u2013 preventive maintenance cost' },
      { name: 'Machine Set-Up Time',                       def: 'Time required to prepare the machine for the next production run.',                                                       formula: '= Time required to prepare the machine for the next run' },
    ],
  },
  {
    slug: 'customer',
    title: 'Customer & Responsiveness KPIs',
    intro: 'Metrics that translate manufacturing performance into customer experience.',
    kpis: [
      { name: 'On-Time Delivery to Commit',                def: 'How often products are delivered as promised.',                                                                           formula: '= # of products delivered on time / total # of products delivered' },
      { name: 'Lead Time',                                 def: 'Total time it takes for customers to receive their orders after placement.',                                              formula: 'Lead time = Order process time + production lead time + delivery lead time' },
      { name: 'Customer Fill Rate',                        def: 'Fulfillment of customer orders through existing inventory.',                                                              formula: 'Fill rate = (# of orders delivered / # of orders placed) \u00d7 100' },
      { name: 'Customer Return Rate',                      def: 'Customer retention and loyalty \u2014 measures repeat business.',                                                          formula: '= (# of return customers / total # of customers) \u00d7 100' },
      { name: 'Customer Satisfaction',                     def: 'Survey-based measure of customer satisfaction.',                                                                          formula: '= (# of very/extremely satisfied / total # surveyed) \u00d7 100' },
    ],
  },
  {
    slug: 'quality',
    title: 'Quality KPIs',
    intro: 'Conformance, customer satisfaction, cost control, and process efficiency \u2014 the quality view.',
    kpis: [
      { name: 'Yield',                                     def: 'Actual products manufactured vs. maximum possible yield from raw materials.',                                            formula: 'Yield = (Actual # produced / theoretical max yield from inputs) \u00d7 100' },
      { name: 'First Time Yield',                          def: 'Non-defective products without rework.',                                                                                  formula: 'FTY = # of non-defective units / total # of products manufactured' },
      { name: 'Perfect Order Percentage',                  def: 'Complete orders shipped on time and without issues.',                                                                     formula: '= (% on-time) \u00d7 (% complete) \u00d7 (% damage-free) \u00d7 (% accurate docs) \u00d7 100' },
      { name: 'Return Merchandise Authorizations (RMA)',   def: 'Dissatisfaction and refunds for returned goods.',                                                                         formula: 'RMA = (# of RMAs / # of orders delivered) \u00d7 100' },
      { name: 'Customer Reject Rate',                      def: 'Defective parts delivered to customers.',                                                                                  formula: '= (# of rejected parts / total # in all shipped products) \u00d7 100' },
      { name: 'Supplier Quality (Incoming)',               def: 'Quality of incoming raw materials.',                                                                                       formula: '= # of quality raw materials / total # of incoming materials' },
      { name: 'Scrap Rate',                                def: 'Discarded materials during manufacturing.',                                                                                 formula: 'Scrap rate = Amount of scrap produced / total materials intake' },
    ],
  },
  {
    slug: 'lean',
    title: 'Lean Manufacturing KPIs',
    intro: 'Continuous-improvement signals \u2014 the metrics lean operators track week over week.',
    kpis: [
      { name: 'Cycle Time',                                def: 'Average time taken to complete a customer order.',                                                                        formula: 'Cycle time = (Order received \u2013 order placed) / # total shipped orders' },
      { name: 'First Pass Yield',                          def: 'Quality measure for non-defective products built the first time \u2014 excludes rework and scrap.',                        formula: 'FPY = # of non-defective products (excluding rework & scrap) / total # manufactured' },
      { name: 'Machine Downtime Rate',                     def: 'Unavailability of equipment \u2014 planned and unplanned.',                                                                formula: 'Downtime rate = Total uptime / (total uptime + total downtime)' },
      { name: 'Material Yield Variance',                   def: 'Difference between actual and standard material usage.',                                                                  formula: '= (Actual unit usage \u2013 standard unit usage) \u00d7 standard cost per unit' },
      { name: 'Overtime Rate',                             def: 'Extra hours beyond normal \u2014 often a planning-or-capacity signal.',                                                     formula: 'OT rate = (Overtime hours / total hours worked) \u00d7 100' },
    ],
  },
  {
    slug: 'performance',
    title: 'Performance KPIs',
    intro: 'Production-stage performance \u2014 attainment, changeover, and market pace.',
    kpis: [
      { name: 'Production Attainment',                     def: 'How well manufacturing meets its target production levels.',                                                              formula: 'Production attainment = (Actual production / scheduled production) \u00d7 100' },
      { name: 'Changeover Time',                           def: 'Time to transition a line from making one product to another.',                                                            formula: 'Avg changeover = Total changeover time / # of changeovers' },
      { name: 'Takt Time',                                 def: 'The rate at which a product must be completed to meet customer demand.',                                                  formula: 'Takt time = Total available production time / average customer demand' },
    ],
  },
  {
    slug: 'innovation',
    title: 'Innovation KPIs',
    intro: 'Creativity, adaptability, and progressiveness \u2014 the leading indicators of where the operation is heading.',
    kpis: [
      { name: 'New Product Introduction (NPI) Rate',       def: 'How frequently new products are introduced into the market.',                                                              formula: 'NPI rate = # of new products / NPI goals' },
      { name: 'Engineering Change Order Cycle Time',       def: 'Time to complete a product change from receipt of change order to implementation.',                                       formula: '= ECO cycle time in days, weeks, or months' },
    ],
  },
];
