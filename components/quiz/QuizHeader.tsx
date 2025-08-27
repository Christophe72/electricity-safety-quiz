import { Button } from "@/components/ui/button";
import { User, LogOut, History } from "lucide-react";

interface QuizHeaderProps {
  userName: string;
  onShowHistory: () => void;
  onLogout: () => void;
}

export function QuizHeader({
  userName,
  onShowHistory,
  onLogout,
}: QuizHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between p-4 bg-muted rounded-lg">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <span className="font-medium">{userName}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onShowHistory}>
          <History className="h-4 w-4 mr-1" />
          Historique
        </Button>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-1" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}
