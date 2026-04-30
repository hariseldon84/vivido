type Tab = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: readonly Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
};

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tab-button${tab.id === activeTab ? " active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
