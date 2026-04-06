const ChatSkeleton = () => (
  <div className="flex justify-start animate-fade-in">
    <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
      <div className="h-4 w-4 rounded-full bg-muted-foreground/20" />
    </div>
    <div className="max-w-[85%] space-y-2 rounded-2xl border border-border bg-card px-4 py-4">
      <div className="h-3 w-48 animate-pulse rounded bg-muted" />
      <div className="h-3 w-36 animate-pulse rounded bg-muted" />
      <div className="h-3 w-52 animate-pulse rounded bg-muted" />
    </div>
  </div>
);

export default ChatSkeleton;
