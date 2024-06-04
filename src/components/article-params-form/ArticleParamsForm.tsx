import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import {
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

type FormStates = {
	fontState: OptionType;
	setFontState: Dispatch<SetStateAction<OptionType>>;
	fontSizeState: OptionType;
	setFontSizeState: Dispatch<SetStateAction<OptionType>>;
	fontColorState: OptionType;
	setFontColorState: Dispatch<SetStateAction<OptionType>>;
};

export const ArticleParamsForm = (props: FormStates) => {
	const {
		fontState,
		setFontState,
		fontSizeState,
		setFontSizeState,
		fontColorState,
		setFontColorState,
	} = props;
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
	const handleFontSizeOnChange = (fontSize: OptionType) => {
		setFontSizeState(fontSize);
	};
	const handleFontColorChange = (fontColor: OptionType) => {
		setFontColorState(fontColor);
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
						onChange={handleFontOnChange}
						title='шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSizeState}
						onChange={handleFontSizeOnChange}
						title='размер шрифта'
					/>
					<Select
						selected={fontColorState}
						options={fontColors}
						onChange={handleFontColorChange}
						title='цвет шрифта'
					/>
					<Separator />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
