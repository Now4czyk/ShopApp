import classes from './ModificationChangeListItem.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

const ModificationChangeListItem: React.FC<{
	product: {
		title: string;
		url: string;
		id: string;
		key: string;
		price: number;
	};
}> = (props) => {
	const [enteredTitle, setEnteredTitle] = useState(props.product.title);
	const [enteredPrice, setEnteredPrice] = useState(props.product.price);
	const [enteredUrl, setEnteredUrl] = useState(props.product.url);
	const [isValidTitle, setIsValidTitle] = useState(true);
	const [isValidPrice, setIsValidPrice] = useState(true);
	const [isValidUrl, setIsValidUrl] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const router = useRouter();

	const sectionVisibilityHandler = () => {
		setIsEditing(!isEditing);
	};

	const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			setEnteredTitle(event.target.value);
		} else {
			setEnteredTitle(props.product.title);
		}
		const re = /^[0-9A-Za-z\s\-]+$/;
		setIsValidTitle(
			(re.test(event.target.value) && event.target.value.length <= 12) ||
				event.target.value.length === 0
		);
	};

	const urlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			setEnteredUrl(event.target.value);
		} else {
			setEnteredUrl(props.product.url);
		}
		const re =
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
		setIsValidUrl(
			re.test(event.target.value) || event.target.value.length === 0
		);
	};

	const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value) {
			setEnteredPrice(parseFloat(parseFloat(event.target.value).toFixed(2)));
		} else {
			setEnteredPrice(props.product.price);
		}

		const re = /^[+-]?\d+(\.\d+)?$/;
		setIsValidPrice(
			(re.test(event.target.value) && event.target.value.length <= 8) ||
				event.target.value.length === 0
		);
	};

	const redirectHandler = () => {
		router.push(`./${props.product.id}`);
	};

	const deleteHandler = () => {
		console.log(props.product.id);
		const response = fetch('/api/change-product', {
			method: 'DELETE',
			body: JSON.stringify({
				id: props.product.id,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		router.push('./');
	};

	const formSubmission = (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitted(true);
		if (isValidTitle && isValidPrice && isValidUrl) {
			setIsEditing(!isEditing);
			setIsSubmitted(false);
			const data = {
				title: enteredTitle,
				url: enteredUrl,
				price: enteredPrice,
			};
			const response = fetch('/api/change-product', {
				method: 'PUT',
				body: JSON.stringify({
					id: props.product.id,
					change: data,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			router.push('./');
		}
	};

	return (
		<div className={classes.item}>
			<div className={classes.itemData}>
				<img
					className={classes.productImg}
					onClick={redirectHandler}
					src={props.product.url}
				/>
				<div className={classes.data}>
					<div className={classes.productTitle} onClick={redirectHandler}>
						{props.product.title}
						<span className={classes.id}>({props.product.id})</span>
					</div>
					<div className={classes.price}>${props.product.price}</div>
				</div>
				{!isEditing && (
					<div className={classes.actions}>
						<button onClick={sectionVisibilityHandler} className={classes.edit}>
							Edit
						</button>
						<img
							onClick={deleteHandler}
							className={classes.deleteImg}
							src='https://cdn.iconscout.com/icon/free/png-256/close-1912235-1617704.png'
						/>
					</div>
				)}
			</div>

			{isEditing && (
				<form className={classes.editForm}>
					<div className={classes.field}>
						<label htmlFor='title'>Title:</label>
						<input onChange={titleHandler} type='text' id='title'></input>
						{isValidTitle === false && isSubmitted == true && (
							<p
								className={
									classes.error
								}>{`Enter valid title(length <= 12)`}</p>
						)}
					</div>
					<div className={classes.field}>
						<label htmlFor='price'>Price:</label>
						<input onChange={priceHandler} type='text' id='price'></input>
						{isValidPrice === false && isSubmitted == true && (
							<p className={classes.error}>Enter valid price</p>
						)}
					</div>
					<div className={classes.field}>
						<label htmlFor='url'>Url:</label>
						<div>1. Recommended size: 800x1155px</div>
						<div>2. Https protocole required</div>
						<input onChange={urlHandler} type='text' id='url'></input>
						{isValidUrl === false && isSubmitted == true && (
							<p className={classes.error}>Enter valid url</p>
						)}
					</div>
					<div className={classes.actions}>
						<button
							type='submit'
							onClick={formSubmission}
							className={classes.confirm}>
							Confirm
						</button>
						<button
							type='button'
							className={classes.cancel}
							onClick={sectionVisibilityHandler}>
							Cancel
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default ModificationChangeListItem;
