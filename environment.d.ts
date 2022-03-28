declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_DB: string;
			NODE_ENV: 'development' | 'production';
			PORT?: string;
			PWD: string;
		}
	}
}

export {};
