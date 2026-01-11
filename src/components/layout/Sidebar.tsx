export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0e1621] border-r border-gray-800 p-6">
      <h1 className="text-xl font-bold text-cyan-400 mb-10">
        JUPLEND <span className="text-white">RISK</span>
      </h1>

      <nav className="space-y-4 text-gray-400">
        <div className="hover:text-white cursor-pointer">
          Dashboard
        </div>
        <div className="hover:text-white cursor-pointer">
          Risk Monitor
        </div>
        <div className="hover:text-white cursor-pointer">
          Analytics
        </div>
        <div className="hover:text-white cursor-pointer">
          Docs
        </div>
      </nav>
    </aside>
  );
}
