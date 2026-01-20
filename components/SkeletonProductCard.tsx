export default function SkeletonProductCard() {
  return (
    <div className="bg-card rounded-xl p-3 animate-pulse">
      <div className="h-40 bg-muted rounded mb-3" />
      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-8 bg-muted rounded mt-3" />
    </div>
  )
}
