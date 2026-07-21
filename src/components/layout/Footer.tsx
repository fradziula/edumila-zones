import { Link } from "@tanstack/react-router";
import { AtSign, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container-page py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-semibold">
            Edu<span className="text-karolina">Mila</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Korepetycje z matematyki i chemii. Wadowice i online — cała Polska.
          </p>
          <p className="mt-4 font-hand text-xl text-karolina">Odkryj ze mną siłę nauki</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Strefy</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/rodzic" className="hover:text-foreground">
                Rodzic
              </Link>
            </li>
            <li>
              <Link to="/prezent" className="hover:text-foreground">
                Prezent
              </Link>
            </li>
            <li>
              <Link to="/uczen" className="hover:text-foreground">
                Uczeń
              </Link>
            </li>
            <li>
              <Link to="/karolina" className="hover:text-foreground">
                Karolina
              </Link>
            </li>
            <li>
              <Link to="/wszystko" className="hover:text-foreground">
                Cała strona
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Kontakt</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone size={14} /> 667 541 916
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} /> edumila.kontakt@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <AtSign size={14} /> @korepetycje_edumila
            </li>
            <li className="pt-2">Karolina Widlarz</li>
            <li>NIP: 5512667603</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Korepetycje — Karolina Widlarz</span>
          <div className="flex gap-4">
            <Link to="/polityka-prywatnosci" className="hover:text-foreground">
              Polityka prywatności
            </Link>
            <Link to="/rodzic/regulamin" className="hover:text-foreground">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
