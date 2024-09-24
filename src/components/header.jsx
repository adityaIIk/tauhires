import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import logo from "../assets/logo/TauLogo.svg";
import DarkModeToggle from "./dark-toggle";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, Heart, PenBox, User } from "lucide-react";

const Header = () => {
  const [showSignIn, setshowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setshowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setshowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <header className="z-50">
        <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 max-w-7xl mx-auto">
          <Link>
            <img src={logo} className="h-10 dark:invert" />
          </Link>
          <div className="flex-1 flex items-center justify-end space-x-4 mt-4">
            <SignedOut>
              <Button
                variant="outline"
                onClick={() => {
                  setshowSignIn(true);
                }}
              >
                Login
              </Button>
            </SignedOut>
            <SignedIn>
              {user?.unsafeMetadata?.role === "recruiter" && (
                <Link to="/post-job">
                  <Button
                    variant="destructive"
                    className="rounded-full flex items-center justify-center md:px-4 md:py-2 w-10 h-10 md:w-auto md:h-auto"
                  >
                    <PenBox size={10} className="mr-0 md:mr-2" />
                    <span className="hidden md:inline">Post a Job</span>
                  </Button>
                </Link>
              )}

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My-Jobs"
                    labelIcon={<BriefcaseBusinessIcon size={15} />}
                    href="/my-jobs"
                  />
                  <UserButton.Link
                    label="Saved-Jobs"
                    labelIcon={<Heart size={15} />}
                    href="/saved-jobs"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
            <DarkModeToggle />
          </div>
        </nav>
        {showSignIn && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOverlayClick}
          >
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
