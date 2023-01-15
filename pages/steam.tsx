import Link from "next/link";
import router from "../lib/router";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession, getSession } from "next-auth/react";

export default function Steam({ user }: any) {

	const { data: session, status } = useSession();
	const userEmail = session?.user?.email as string;
	const linkSteamToEmail = async () => {
		event?.preventDefault();
	
	
		toast.loading("Updating database");
		await axios({
		  method: "post",
		  url: "/api/steam/link",
		  data: {
			email: userEmail,
			steam_id: user.id
		  },
		})
		  .then((response) => {
			console.log(response)
			toast.success(`Succesfully linked steam ID.`);
			
	
		  })
		  .catch((e) => {
			console.log(e)
			toast.error(
			  `${e.message} Please try generating a new authorization code.`
			);
		  });
	  };

	return ( 
	<><div  className="text-white justify-content bg-gray-900 px-4 h-[32rem]">
		{user 
			? <div >
				Welcome back, {user.displayName}!<br />
				
				Click Link Steam account to link this steam account to the logged-in e-mail address.<br />
				<input
			   
			   
			   type="text"
			   className="
	 form-control
	 block
	 w-2/5
	 px-3
	 py-1.5
	 text-base
	 font-normal
	 text-gray-700
	 bg-white bg-clip-padding
	 border border-solid border-gray-300
	 rounded
	 transition
	 ease-in-out
	 m-0
	 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
	 my-2
   "
			   id="userId"
			   placeholder={`Steam id: ${user.id}`}
			   disabled
			 />
				<Link className="inline-block px-6 py-2.5 bg-primary text-black font-medium text-xs leading-tight uppercase hover:bg-[#51AD51] transition duration-150 ease-in-out cursor-pointer"
			   href="/api/auth/logout">Logout</Link>
				<button
				 type="submit"
				 onClick={linkSteamToEmail}
				 className="inline-block mx-3 px-6 py-2.5 bg-primary text-black font-medium text-xs leading-tight uppercase hover:bg-[#51AD51] transition duration-150 ease-in-out cursor-pointer"
			   >
				 Link Steam account
			   </button>
			</div>

			: <div>
				Welcome to the Steam account linking page<br />
				<Link className="inline-block px-6 py-2.5 bg-primary text-black font-medium text-xs leading-tight uppercase hover:bg-[#51AD51] transition duration-150 ease-in-out cursor-pointer"
			   href="/api/auth/login">Login</Link>

				
			</div>
		}
	</div></>);

	
	}


export async function getServerSideProps({ req, res}: any) {
    await router.run(req, res);
    return { props: { user: req.user || null } };
}