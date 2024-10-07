import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<p>
          Made with 🍑 by
          <a 
          href="https://github.com/CoolPenwin" 
          > 
            <img
              className="logo"
              src="https://avatars.githubusercontent.com/u/171165391?v=4"  
              style={{
                border: "1px solid rgb(255, 255, 255)",
                borderRadius: "50%",
                width: "40px",
              }}
              alt="logo"
            />
            CoolPenwin 
          </a>{" "}


          <a 
          href="https://github.com/CodeAaronM" 
          > 
            <img
              className="logo"
              src="https://avatars.githubusercontent.com/u/170790364?v=4"  
              style={{
                border: "1px solid rgb(255, 255, 255)",
                borderRadius: "50%",
                width: "40px",
              }}
              alt="logo"
            />
            CodeAAron 
          </a>{" "}



          <a 
          href="https://github.com/eliasjr89" 
          > 
            <img
              className="logo"
              src="https://avatars.githubusercontent.com/u/167987056?v=4"  
              style={{
                border: "1px solid rgb(255, 255, 255)",
                borderRadius: "50%",
                width: "40px",
              }}
              alt="logo"
            />
            Elías JR 
          </a>{" "}
          on
          <a href="https://www.4geeksacademy.com">
            {" "}
            4GeeksAcademy
            <img
              className="logo"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.NzJUc0PYtkgp7lfNKizmgQHaHB%26pid%3DApi&f=1&ipt=271cb3eb7e5f15522c250313a63e781bdb17fd428148a3cfa3fc136c7c118f42&ipo=images"
              style={{
                border: "1px solid rgb(255, 255, 255)",
                borderRadius: "50%",
                width: "35px",
              }}
              alt="logo"
            />
          </a>
		</p>
	</footer>
);
