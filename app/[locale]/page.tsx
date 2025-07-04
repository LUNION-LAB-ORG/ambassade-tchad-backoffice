import { Link } from "@/i18n/routing";
import Social from "@/components/partials/auth/social";
import LoginForm from "@/components/partials/auth//login-form";
import Image from "next/image";
import Logo from "@/components/logo";
import DashCodeLogo from "@/components/dascode-logo";

const Login3 = () => {
  return (
    <>
      <div
        className="flex w-full items-center overflow-hidden min-h-dvh h-dvh basis-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(/images/all-img/page-bg.png)`,
        }}
      >
        <div className="overflow-y-auto flex flex-wrap w-full h-dvh">
          <div
            className="lg:block hidden flex-1 overflow-hidden text-[40px] leading-[48px] text-default-600 
s lg:w-1/2"
          >
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 min-h-screen bg-[#0D1B2A] px-4">
              <Link
                href="/"
                className="flex-shrink-0"
                aria-label="Retour à l'accueil"
              >
                <Image
                  src="/images/logo/logo.png"
                  alt="Logo de l'Ambassade du Tchad"
                  width={120}
                  height={120}
                  className="rounded-full object-contain lg:w-28 lg:h-28 w-24 h-24"
                  priority
                />
              </Link>
              <div className="text-center text-white">
                <h1 className="text-3xl lg:text-4xl font-bold leading-snug">
                  Ambassade de la République du Tchad
                </h1>
                <p className="text-sm mt-2 opacity-80">
                  Ministère des Affaires Étrangères et de la Coopération
                  Internationale
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
          <div className="bg-default-50  relative h-auto  lg:mr-[150px] mr-auto p-10 md:rounded-md max-w-[520px] w-full ml-auto text-2xl text-default-900  mb-3">
            <div className="flex justify-center items-center text-center mb-6 lg:hidden ">
              <Link href="/">
                <DashCodeLogo />
              </Link>
            </div>
            <div className="text-center 2xl:mb-10 mb-5">
              <h4 className="font-medium">Connexion</h4>
            </div>
            <LoginForm />

            <div className="mx-auto font-normal text-default-500  2xl:mt-12 mt-6  text-sm text-center">
              <span className="text-blue-500">Pas de compte?</span> Veuillez
              contacter l'administrateur pour créer un compte.
            </div>
          </div>
        </div>
        {/* <div className="absolute bottom-0 lg:block hidden text-white py-5 px-5 text-xl w-full">
            Unlock your Project{" "}
            <span className="text-white font-bold ms-1">performance</span>
          </div> */}
      </div>
    </>
  );
};

export default Login3;
