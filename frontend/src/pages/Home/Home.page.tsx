import HeroBullets from '@/components/Hero/Hero';
import CarouselSection from '@/components/CarouselSection/CarouselSection';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useTranslation } from 'react-i18next';
import CloudTags from '@/components/CloudTags/CloudTags';
export interface ITag {
	color: string;
	text: string;
}

export interface ICollectionCard {
	title: string;
	owner:{
		_id: string;
		name: string;
	}
	description: string;
	description_text: string;
	isLiked: boolean;
	type:{
		_id: string;
		type: string;
	}
	_id: string;
	img:string
}
export interface IItemCard{
	title: string;
	owner: {
		_id: string;
		name: string;
	};
	isLiked: boolean;
	_id: string;
	collectionId:{
		_id: string;
		title: string;
	},
	tags: ITag[]
	img:string
}


export function HomePage() {
	const {t} = useTranslation();
	const [collections, setCollections] = useState<ICollectionCard[]>([])
	const [items, setItems] = useState<IItemCard[]>([])
	const [tags, setTags] = useState<ITag[]>([])
	const [loading, setLoading] = useState(true);
	
	const axios = useAxiosPrivate()

	useEffect(() => {
		const loadHodeData = async() =>{
			const {data} = await axios.get('/homeData')
			const {collections, items, tags} = data
			setCollections(collections)
			setItems(items)
			setTags(tags)

			setLoading(false);
		}
		loadHodeData()
	}, [axios]);

	return (
		<>
			<HeroBullets />


			<CarouselSection data={collections} title={t('homePage.carousel.largestCollections')} type='collections' loading={loading}/>
			<CarouselSection data={items} title={t('homePage.carousel.newestItems')} type='items' loading={loading}/>
			<CloudTags tags={tags}/>
		</>
	);
}
