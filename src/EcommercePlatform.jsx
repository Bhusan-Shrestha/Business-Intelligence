import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShoppingCart, Package, TrendingUp, Users, DollarSign, Settings, Bell, Search, Menu, Home, Tag, ShoppingBag, Warehouse, CreditCard, Activity, FileText, MessageSquare, Mail, BarChart3, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const EcommercePlatform = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [userRole, setUserRole] = useState('admin');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(5);

  // Mock data for various modules
  const salesData = [
    { month: 'Jan', sales: 45000, orders: 320 },
    { month: 'Feb', sales: 52000, orders: 380 },
    { month: 'Mar', sales: 48000, orders: 350 },
    { month: 'Apr', sales: 61000, orders: 425 },
    { month: 'May', sales: 58000, orders: 410 },
    { month: 'Jun', sales: 70000, orders: 495 }
  ];

  const inventoryData = [
    { name: 'In Stock', value: 1200, color: '#10b981' },
    { name: 'Low Stock', value: 150, color: '#f59e0b' },
    { name: 'Out of Stock', value: 45, color: '#ef4444' }
  ];

  const recentOrders = [
    { id: 'ORD-2024-001', customer: 'John Doe', total: 1250, status: 'Shipped', date: '2024-11-14' },
    { id: 'ORD-2024-002', customer: 'Jane Smith', total: 890, status: 'Processing', date: '2024-11-14' },
    { id: 'ORD-2024-003', customer: 'Acme Corp', total: 15600, status: 'Delivered', date: '2024-11-13' },
    { id: 'ORD-2024-004', customer: 'Tech Solutions', total: 3400, status: 'Pending', date: '2024-11-13' }
  ];

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, roles: ['admin', 'manager'] },
    { id: 'marketing', name: 'Marketing', icon: TrendingUp, roles: ['admin', 'marketing'] },
    { id: 'sales', name: 'Sales', icon: ShoppingCart, roles: ['admin', 'sales'] },
    { id: 'purchases', name: 'Purchases', icon: ShoppingBag, roles: ['admin', 'procurement'] },
    { id: 'warehouse', name: 'Warehouse', icon: Warehouse, roles: ['admin', 'warehouse'] },
    { id: 'finance', name: 'Finance', icon: DollarSign, roles: ['admin', 'finance'] },
    { id: 'operations', name: 'Operations', icon: Activity, roles: ['admin', 'operations'] },
    { id: 'it', name: 'IT & Dev', icon: Settings, roles: ['admin', 'it'] }
  ];

  const DashboardModule = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={DollarSign} title="Total Revenue" value="$387,500" change="+12.5%" positive />
        <MetricCard icon={ShoppingCart} title="Total Orders" value="2,485" change="+8.2%" positive />
        <MetricCard icon={Users} title="Active Customers" value="1,842" change="+15.3%" positive />
        <MetricCard icon={Package} title="Products" value="1,395" change="-2.1%" positive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Inventory Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={inventoryData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">${order.total.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3 px-4">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const MarketingModule = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard icon={TrendingUp} title="Website Traffic" value="45,231" change="+18.7%" positive />
        <MetricCard icon={Mail} title="Email Campaign CTR" value="3.8%" change="+0.5%" positive />
        <MetricCard icon={Users} title="Social Engagement" value="12.5K" change="+22.3%" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
          <div className="space-y-4">
            <CampaignItem name="Summer Sale 2024" type="Email" status="Active" conversion="4.2%" />
            <CampaignItem name="Google Ads - Tech" type="PPC" status="Active" conversion="2.8%" />
            <CampaignItem name="Meta Retargeting" type="Social" status="Active" conversion="3.5%" />
            <CampaignItem name="SEO Campaign" type="Organic" status="Ongoing" conversion="5.1%" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Content Publishing</h3>
          <div className="space-y-3">
            <ContentItem title="10 Tips for Better Shopping" status="Published" date="Nov 12" />
            <ContentItem title="New Product Launch Guide" status="Draft" date="Nov 14" />
            <ContentItem title="Holiday Gift Ideas 2024" status="Scheduled" date="Nov 20" />
            <ContentItem title="Customer Success Stories" status="Review" date="Nov 13" />
          </div>
        </div>
      </div>
    </div>
  );

  const SalesModule = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard icon={ShoppingCart} title="Today's Orders" value="47" change="+5" positive />
        <MetricCard icon={DollarSign} title="Avg Order Value" value="$156" change="+$12" positive />
        <MetricCard icon={Tag} title="Active Promotions" value="8" change="2 ending soon" positive={false} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Product Catalog</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Product
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductCard name="Wireless Headphones" price={89.99} stock={145} sales={342} />
          <ProductCard name="Smart Watch Pro" price={299.99} stock={67} sales={189} />
          <ProductCard name="Laptop Stand" price={45.50} stock={203} sales={521} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">B2B Wholesale Portal</h3>
        <div className="space-y-3">
          <B2BClient name="Tech Solutions Inc." orders={45} value="$125,400" tier="Platinum" />
          <B2BClient name="Retail Partners LLC" orders={32} value="$89,200" tier="Gold" />
          <B2BClient name="Global Distributors" orders={28} value="$76,500" tier="Gold" />
        </div>
      </div>
    </div>
  );

  const PurchasesModule = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard icon={ShoppingBag} title="Active POs" value="23" change="5 pending" positive />
        <MetricCard icon={Users} title="Vendors" value="47" change="+3 new" positive />
        <MetricCard icon={AlertCircle} title="Restock Alerts" value="12" change="Action needed" positive={false} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Purchase Orders</h3>
        <div className="space-y-3">
          <POItem id="PO-2024-089" vendor="Global Supplies" amount={15600} status="Approved" date="Nov 14" />
          <POItem id="PO-2024-090" vendor="Tech Components" amount={8900} status="Pending" date="Nov 14" />
          <POItem id="PO-2024-091" vendor="Office Essentials" amount={3400} status="In Transit" date="Nov 12" />
          <POItem id="PO-2024-092" vendor="Quality Materials" amount={12100} status="Received" date="Nov 10" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Vendor Performance</h3>
        <div className="space-y-3">
          <VendorItem name="Global Supplies" rating={4.8} onTime={95} orders={156} />
          <VendorItem name="Tech Components" rating={4.6} onTime={92} orders={134} />
          <VendorItem name="Quality Materials" rating={4.9} onTime={98} orders={89} />
        </div>
      </div>
    </div>
  );

  const WarehouseModule = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard icon={Package} title="Total Items" value="1,395" change="+45" positive />
        <MetricCard icon={AlertCircle} title="Low Stock" value="150" change="Reorder" positive={false} />
        <MetricCard icon={CheckCircle} title="Ready to Ship" value="89" change="+12 today" positive />
        <MetricCard icon={Clock} title="Pending Returns" value="23" change="Process" positive={false} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Inventory Management</h3>
        <div className="mb-4 flex gap-2">
          <input 
            type="text" 
            placeholder="Scan barcode or search SKU..." 
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Scan
          </button>
        </div>
        <div className="space-y-3">
          <InventoryItem sku="SKU-10234" name="Wireless Headphones" quantity={145} location="A-12-3" status="In Stock" />
          <InventoryItem sku="SKU-10235" name="Smart Watch Pro" quantity={67} location="B-08-2" status="In Stock" />
          <InventoryItem sku="SKU-10236" name="USB-C Cable 2m" quantity={12} location="C-15-1" status="Low Stock" />
          <InventoryItem sku="SKU-10237" name="Phone Case Premium" quantity={0} location="A-09-4" status="Out of Stock" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Shipping Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ShippingCard carrier="FedEx" active={156} pending={23} />
          <ShippingCard carrier="DHL Express" active={89} pending={12} />
          <ShippingCard carrier="UPS Ground" active={234} pending={45} />
        </div>
      </div>
    </div>
  );

  const FinanceModule = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard icon={DollarSign} title="Revenue (MTD)" value="$387.5K" change="+12.5%" positive />
        <MetricCard icon={CreditCard} title="Outstanding" value="$45.2K" change="18 invoices" positive={false} />
        <MetricCard icon={BarChart3} title="Profit Margin" value="24.8%" change="+2.1%" positive />
        <MetricCard icon={FileText} title="Tax Collected" value="$38.7K" change="Q4 2024" positive />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Financial Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ReportCard title="Profit & Loss" period="Nov 2024" status="Ready" />
          <ReportCard title="Cash Flow" period="Q4 2024" status="Ready" />
          <ReportCard title="Balance Sheet" period="Oct 2024" status="Available" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Invoices</h3>
        <div className="space-y-3">
          <InvoiceItem id="INV-2024-445" client="Acme Corp" amount={15600} status="Paid" date="Nov 13" />
          <InvoiceItem id="INV-2024-446" client="Tech Solutions" amount={8900} status="Pending" date="Nov 14" />
          <InvoiceItem id="INV-2024-447" client="Retail Partners" amount={12300} status="Overdue" date="Nov 05" />
          <InvoiceItem id="INV-2024-448" client="Global Distributors" amount={23400} status="Paid" date="Nov 12" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Accounting Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <IntegrationCard name="QuickBooks" status="Connected" lastSync="2 hours ago" />
          <IntegrationCard name="Xero" status="Connected" lastSync="1 hour ago" />
        </div>
      </div>
    </div>
  );

  const OperationsModule = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard icon={Activity} title="Active Tasks" value="34" change="12 overdue" positive={false} />
        <MetricCard icon={CheckCircle} title="Completed Today" value="18" change="+5" positive />
        <MetricCard icon={Clock} title="Avg Resolution" value="2.3h" change="-0.4h" positive />
        <MetricCard icon={AlertCircle} title="SLA Breaches" value="3" change="This week" positive={false} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Task Management</h3>
        <div className="space-y-3">
          <TaskItem title="Process bulk order #ORD-2024-455" priority="High" assignee="John D." status="In Progress" />
          <TaskItem title="Resolve shipping delay - FedEx" priority="Critical" assignee="Sarah M." status="Open" />
          <TaskItem title="Update inventory counts - Warehouse A" priority="Medium" assignee="Mike R." status="In Progress" />
          <TaskItem title="Quarterly vendor review" priority="Low" assignee="Lisa K." status="Scheduled" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Delivery Tracking</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={[
            { day: 'Mon', delivered: 45, pending: 12 },
            { day: 'Tue', delivered: 52, pending: 8 },
            { day: 'Wed', delivered: 48, pending: 15 },
            { day: 'Thu', delivered: 61, pending: 10 },
            { day: 'Fri', delivered: 58, pending: 7 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="delivered" fill="#10b981" />
            <Bar dataKey="pending" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const ITModule = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard icon={Activity} title="System Uptime" value="99.9%" change="Last 30 days" positive />
        <MetricCard icon={AlertCircle} title="Error Rate" value="0.02%" change="-0.01%" positive />
        <MetricCard icon={Users} title="API Calls" value="1.2M" change="+15%" positive />
        <MetricCard icon={Settings} title="Active Users" value="142" change="+8" positive />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">System Architecture</h3>
        <div className="space-y-3 text-sm">
          <ArchItem component="Laravel Backend API" version="10.48.22" status="Running" />
          <ArchItem component="React Frontend (Vite)" version="4.5.0" status="Running" />
          <ArchItem component="MySQL Database" version="8.0.35" status="Running" />
          <ArchItem component="Redis Cache" version="7.2.3" status="Running" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">API Endpoints</h3>
        <div className="space-y-2 text-sm font-mono">
          <APIEndpoint method="GET" path="/api/v1/products" requests="145K" />
          <APIEndpoint method="POST" path="/api/v1/orders" requests="89K" />
          <APIEndpoint method="GET" path="/api/v1/inventory" requests="67K" />
          <APIEndpoint method="PUT" path="/api/v1/customers" requests="45K" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Logs</h3>
        <div className="space-y-2 text-sm">
          <LogItem level="info" message="Order #ORD-2024-456 created successfully" time="2 min ago" />
          <LogItem level="warning" message="High API traffic detected - scaling initiated" time="15 min ago" />
          <LogItem level="info" message="Inventory sync completed" time="1 hour ago" />
          <LogItem level="error" message="Payment gateway timeout - retrying" time="2 hours ago" />
        </div>
      </div>
    </div>
  );

  const MetricCard = ({ icon: Icon, title, value, change, positive }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-8 h-8 text-blue-600" />
        <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const colors = {
      'Shipped': 'bg-blue-100 text-blue-800',
      'Processing': 'bg-yellow-100 text-yellow-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Pending': 'bg-gray-100 text-gray-800',
      'Approved': 'bg-green-100 text-green-800',
      'In Transit': 'bg-blue-100 text-blue-800',
      'Received': 'bg-green-100 text-green-800',
      'Paid': 'bg-green-100 text-green-800',
      'Overdue': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const CampaignItem = ({ name, type, status, conversion }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-600">{type}</p>
      </div>
      <div className="text-right">
        <StatusBadge status={status} />
        <p className="text-sm text-gray-600 mt-1">CVR: {conversion}</p>
      </div>
    </div>
  );

  const ContentItem = ({ title, status, date }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-gray-400" />
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      </div>
      <StatusBadge status={status} />
    </div>
  );

  const ProductCard = ({ name, price, stock, sales }) => (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <div className="bg-gray-100 h-32 rounded mb-3 flex items-center justify-center">
        <Package className="w-12 h-12 text-gray-400" />
      </div>
      <h4 className="font-medium mb-2">{name}</h4>
      <p className="text-xl font-bold text-blue-600 mb-2">${price}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Stock: {stock}</span>
        <span>Sales: {sales}</span>
      </div>
    </div>
  );

  const B2BClient = ({ name, orders, value, tier }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-600">{orders} orders</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-blue-600">{value}</p>
        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{tier}</span>
      </div>
    </div>
  );

  const POItem = ({ id, vendor, amount, status, date }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium">{id}</p>
        <p className="text-sm text-gray-600">{vendor}</p>
      </div>
      <div className="text-right">
        <p className="font-bold">${amount.toLocaleString()}</p>
        <StatusBadge status={status} />
      </div>
    </div>
  );

  const VendorItem = ({ name, rating, onTime, orders }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-600">{orders} orders</p>
      </div>
      <div className="text-right">
        <p className="text-sm">Rating: ⭐ {rating}</p>
        <p className="text-sm text-gray-600">On-time: {onTime}%</p>
      </div>
    </div>
  );

  const InventoryItem = ({ sku, name, quantity, location, status }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <Package className="w-5 h-5 text-gray-400" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-600">{sku} • {location}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">{quantity} units</p>
        <StatusBadge status={status} />
      </div>
    </div>
  );

  const ShippingCard = ({ carrier, active, pending }) => (
    <div className="border rounded-lg p-4">
      <h4 className="font-medium mb-2">{carrier}</h4>
      <div className="space-y-1 text-sm">
        <p className="text-gray-600">Active: <span className="font-medium text-green-600">{active}</span></p>
        <p className="text-gray-600">Pending: <span className="font-medium text-yellow-600">{pending}</span></p>
      </div>
    </div>
  );

  const ReportCard = ({ title, period, status }) => (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <FileText className="w-8 h-8 text-blue-600 mb-2" />
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-gray-600 mb-2">{period}</p>
      <StatusBadge status={status} />
    </div>
  );

  const InvoiceItem = ({ id, client, amount, status, date }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium">{id}</p>
        <p className="text-sm text-gray-600">{client}</p>
      </div>
      <div className="text-right">
        <p className="font-bold">${amount.toLocaleString()}</p>
        <div className="flex items-center gap-2 mt-1">
          <StatusBadge status={status} />
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>
    </div>
  );

  const IntegrationCard = ({ name, status, lastSync }) => (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">{name}</h4>
        <StatusBadge status={status} />
      </div>
      <p className="text-sm text-gray-600">Last sync: {lastSync}</p>
    </div>
  );

  const TaskItem = ({ title, priority, assignee, status }) => {
    const priorityColors = {
      'Critical': 'bg-red-100 text-red-800',
      'High': 'bg-orange-100 text-orange-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-gray-100 text-gray-800'
    };
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <p className="font-medium mb-1">{title}</p>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[priority]}`}>
              {priority}
            </span>
            <span className="text-sm text-gray-600">Assigned to: {assignee}</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>
    );
  };

  const ArchItem = ({ component, version, status }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium">{component}</p>
        <p className="text-xs text-gray-500">v{version}</p>
      </div>
      <StatusBadge status={status} />
    </div>
  );

  const APIEndpoint = ({ method, path, requests }) => {
    const methodColors = {
      'GET': 'bg-green-100 text-green-800',
      'POST': 'bg-blue-100 text-blue-800',
      'PUT': 'bg-yellow-100 text-yellow-800',
      'DELETE': 'bg-red-100 text-red-800'
    };
    return (
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${methodColors[method]}`}>
            {method}
          </span>
          <span>{path}</span>
        </div>
        <span className="text-gray-600">{requests} req/day</span>
      </div>
    );
  };

  const LogItem = ({ level, message, time }) => {
    const levelColors = {
      'info': 'text-blue-600',
      'warning': 'text-yellow-600',
      'error': 'text-red-600'
    };
    return (
      <div className="flex items-start gap-2 p-2 bg-gray-50 rounded">
        <span className={`font-medium ${levelColors[level]} uppercase text-xs mt-1`}>{level}</span>
        <div className="flex-1">
          <p className="text-sm">{message}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
    );
  };

  const renderModule = () => {
    switch(activeModule) {
      case 'dashboard': return <DashboardModule />;
      case 'marketing': return <MarketingModule />;
      case 'sales': return <SalesModule />;
      case 'purchases': return <PurchasesModule />;
      case 'warehouse': return <WarehouseModule />;
      case 'finance': return <FinanceModule />;
      case 'operations': return <OperationsModule />;
      case 'it': return <ITModule />;
      default: return <DashboardModule />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">eCommerce Pro</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-8">
          {modules.map(module => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition ${
                  activeModule === module.id ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span>{module.name}</span>}
              </button>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-sm font-medium">Current Role</p>
              <select 
                value={userRole} 
                onChange={(e) => setUserRole(e.target.value)}
                className="mt-2 w-full bg-gray-700 text-white px-2 py-1 rounded text-sm"
              >
                <option value="admin">Admin</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="warehouse">Warehouse</option>
                <option value="finance">Finance</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {modules.find(m => m.id === activeModule)?.name || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
              </div>
              
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="flex items-center gap-2 pl-4 border-l">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {userRole[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="p-6">
          {renderModule()}
        </div>
      </div>
    </div>
  );
};

export default EcommercePlatform;