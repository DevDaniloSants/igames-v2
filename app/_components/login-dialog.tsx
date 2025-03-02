import { LogInIcon } from "lucide-react";
import { BsGoogle } from "react-icons/bs";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface LoginDialogProps {
  handleSignInClick: () => void;
  open: boolean;
}

const LoginDialog = ({ handleSignInClick, open }: LoginDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${open ? "" : "rounded-full"} space-x-3 font-semibold`}
          variant="ghost"
        >
          <LogInIcon />
          {open ? <span className="text-center">Login</span> : null}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] md:w-full">
        <DialogHeader className="flex items-center">
          <DialogTitle>Faça login na plataforma</DialogTitle>
          <DialogDescription>
            Conecte-se usando sua conta do Google
          </DialogDescription>
        </DialogHeader>
        <div>
          <Button className="w-full font-bold" onClick={handleSignInClick}>
            <BsGoogle />
            Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
