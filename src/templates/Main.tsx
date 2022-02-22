import { ReactNode } from "react";

import Link from "next/link";

import { AppConfig } from "../utils/AppConfig";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-800 px-1">
    {props.meta}

    <div className="max-w-screen-md mx-auto">
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-4">
          <div>
            <Link href="/">
              <a className="font-bold text-3xl text-black">{AppConfig.title}</a>
            </Link>
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div>
      </div>

      <div className="py-5 text-xl content">{props.children}</div>
    </div>
  </div>
);

export { Main };
