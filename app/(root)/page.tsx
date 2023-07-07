'use client';

import { useStoreModel } from '@/hooks/use-store-model';
import React, { useEffect } from 'react';

const SetupPage = () => {
	const onOpen = useStoreModel((state) => state.onOpen);
	const isOpen = useStoreModel((state) => state.isOpen);

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [isOpen, onOpen]);

	return <div className="p-4">Root page</div>;
};

export default SetupPage;
