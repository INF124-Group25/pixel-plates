import dynamic from "next/dynamic";
const RegisterForm = dynamic(() => import('../../../components/RegisterForm'), { ssr: false })


export default function Register() {

    return (
        <div>
            <RegisterForm />
        </div>
    );
}