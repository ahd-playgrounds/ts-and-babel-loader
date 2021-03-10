import React, { FC, useEffect, useState } from "react";
import { render } from "react-dom";

const mainElement = document.createElement("div");
mainElement.setAttribute("id", "root");
document.body.appendChild(mainElement);

interface IUser {
  login: string;
}

class BaseError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

class FancyError extends BaseError {
  constructor(msg: string) {
    super(msg);
  }
}

const App: FC = () => {
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    getUser().catch(console.error);
  },[]);

  return (
    <div>
      <p>Hello Typescript</p>
      <p>{user?.login}</p>
      <p>is an error that extends Error able to keep it's prototype chain?</p>
      <p>these should all be true:</p>
      <p>BaseError is an instance of Error? {`${new BaseError('') instanceof Error}`}</p>
      <p>FancyError is an instance of Error? {`${new FancyError('') instanceof Error}`}</p>
      <p>FancyError is an instance of BaseError? {`${new FancyError('') instanceof BaseError}`}</p>
    </div>
  );

  async function getUser(): Promise<void> {
    const data = await fetch("https://api.github.com/users/octocat");
    const orgsData = await data.json();
    setUser(orgsData);
  }
};

render(<App />, mainElement);

