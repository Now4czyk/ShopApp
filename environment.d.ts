declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_DB: string;
			NEXT_PUBLIC_SIGNIN: string;
			NEXT_PUBLIC_SIGNUP: string;
			NEXT_PUBLIC_ADMINID: string;
			NODE_ENV: 'development' | 'production';
			PORT?: string;
			PWD: string;
		}
	}
}

export {};
