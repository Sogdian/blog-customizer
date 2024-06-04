import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { fontFamilyOptions, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import clsx from 'clsx';

type FormStates = {
	fontState: OptionType;
	setFontState: Dispatch<SetStateAction<OptionType>>;
};

export const ArticleParamsForm = (props: FormStates) => {
	const { fontState, setFontState } = props;
	const [isOpen, setOpen] = useState(false);

	const handleClick = () => {
		return setOpen(!isOpen);
	};

	const asideContainerStyle = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	const handleFontOnChange = (font: OptionType) => {
		setFontState(font);
	};

	return (
		<>
			<ArrowButton onClick={handleClick} state={isOpen} />
			<aside className={asideContainerStyle}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontState}
						options={fontFamilyOptions}
						placeholder='Open Sans'
						onChange={(font: OptionType) => {
							handleFontOnChange(font);
						}}
						title='шрифт'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
