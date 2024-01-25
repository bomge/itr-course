import { axiosPrivate } from "./axios";


type handleLikeProps = {
	type: 'collections' | 'items'
	id: string,
	setIsLiked: (v) => void
}
type deleteItemAPIProps = {
	type: 'collections' | 'items'
	id: string,
}
export const handleLike = async ({type, id, setIsLiked}: handleLikeProps) => {
	try {
		const { data } = await axiosPrivate.put(`/${type}/like`, { id });
		const { isLiked } = data
		setIsLiked(isLiked);
	  } catch (error) {
		throw(error);
	  }
}
export const deleteItemAPI = async ({type, id}: deleteItemAPIProps) => {
	try {
		const { data } = await axiosPrivate.delete(`/${type}/${id}`);
		return data
	  } catch (error) {
		throw(error);
	  }
}