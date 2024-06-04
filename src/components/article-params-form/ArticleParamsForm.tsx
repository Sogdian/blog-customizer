import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import {
	backgroundColorsOptions,
	contentWidthArrOptions,
	fontColorsOptions,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

type FormStates = {
	fontState: OptionType;
	setFontState: Dispatch<SetStateAction<OptionType>>;
	fontSizeState: OptionType;
	setFontSizeState: Dispatch<SetStateAction<OptionType>>;
	fontColorState: OptionType;
	setFontColorState: Dispatch<SetStateAction<OptionType>>;
	backgroundColorState: OptionType;
	setBackgroundColorState: Dispatch<SetStateAction<OptionType>>;
	contentWidthArrState: OptionType;
	setContentWidthArrState: Dispatch<SetStateAction<OptionType>>;
	onResetClick: () => void;
	onSubmitClick: () => void;
};

export const ArticleParamsForm = (props: FormStates) => {
	const {
		fontState,
		setFontState,
		fontSizeState,
		setFontSizeState,
		fontColorState,
		setFontColorState,
		backgroundColorState,
		setBackgroundColorState,
		contentWidthArrState,
		setContentWidthArrState,
		onResetClick,
	} = props;

	const [isOpen, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	const handleClick = () => {
		return setOpen(!isOpen);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useOutsideClickClose({
		isOpen,
		onChange: setOpen,
		onClose: handleClose,
		rootRef: ref,
	});

	const asideContainerStyle = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	const handleFontOnChange = (fontFamily: OptionType) => {
		setFontState(fontFamily);
	};
	const handleFontSizeOnChange = (fontSize: OptionType) => {
		setFontSizeState(fontSize);
	};
	const handleFontColorChange = (fontColors: OptionType) => {
		setFontColorState(fontColors);
	};
	const handleBackgroundColorChange = (backgroundColors: OptionType) => {
		setBackgroundColorState(backgroundColors);
	};
	const handleContentWidthArrChange = (contentWidthArr: OptionType) => {
		setContentWidthArrState(contentWidthArr);
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.onSubmitClick();
	};

	return (
		<>
			<ArrowButton onClick={handleClick} state={isOpen} />
			<aside className={asideContainerStyle} ref={ref}>
				<form className={styles.form} onSubmit={handleSubmit}>
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
						options={fontColorsOptions}
						placeholder='Черный>'
						onChange={handleFontColorChange}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColorState}
						options={backgroundColorsOptions}
						placeholder='Белый>'
						onChange={handleBackgroundColorChange}
						title='цвет фона'
					/>
					<Select
						selected={contentWidthArrState}
						options={contentWidthArrOptions}
						placeholder='Широкий'
						onChange={handleContentWidthArrChange}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={onResetClick} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
