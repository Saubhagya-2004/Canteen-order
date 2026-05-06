"use client";

export function FoodCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="h-40 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 bg-muted rounded w-16" />
          <div className="h-8 bg-muted rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-5 bg-muted rounded w-24" />
        <div className="h-5 bg-muted rounded w-16" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
      <div className="h-4 bg-muted rounded w-32" />
      <div className="h-8 bg-muted rounded w-full" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-28 bg-card border border-border rounded-2xl" />
        <div className="h-28 bg-card border border-border rounded-2xl" />
        <div className="h-28 bg-card border border-border rounded-2xl" />
      </div>
      <div className="h-80 bg-card border border-border rounded-2xl" />
      <div className="h-80 bg-card border border-border rounded-2xl" />
    </div>
  );
}

export function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <FoodCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="w-64 h-screen bg-sidebar flex flex-col animate-pulse">
      <div className="p-6 h-16" />
      <div className="px-4 pb-4">
        <div className="h-16 bg-sidebar-accent/30 rounded-xl" />
      </div>
      <div className="flex-1 px-3 space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 bg-sidebar-accent/30 rounded-xl" />
        ))}
      </div>
    </aside>
  );
}
