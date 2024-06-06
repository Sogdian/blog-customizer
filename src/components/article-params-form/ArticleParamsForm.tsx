import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import {
	backgroundColorsOptions,
	contentWidthArrOptions,
	defaultArticleState,
	fontColorsOptions,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

type FormStates = {
	stylesSelected: {
		backgroundColor: string;
		fontFamily: string;
		contentWidth: string;
		fontSize: string;
		fontColor: string;
	};
	onResetClick: () => void;
	onSubmitClick: (p: {
		backgroundColor: string;
		fontFamily: string;
		contentWidth: string;
		fontSize: string;
		fontColor: string;
	}) => void;
};

export const ArticleParamsForm = (props: FormStates) => {
	const { stylesSelected, onResetClick, onSubmitClick } = props;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmitClick({
			fontFamily: fontState.value,
			fontSize: fontSizeState.value,
			fontColor: fontColorState.value,
			backgroundColor: backgroundColorState.value,
			contentWidth: contentWidthArrState.value,
		});
	};

	const handleResetStyles = () => {
		onResetClick();
		setFontState(defaultArticleState.fontFamilyOption);
		setFontSizeState(defaultArticleState.fontSizeOption);
		setFontColorState(defaultArticleState.fontColor);
		setBackgroundColorState(defaultArticleState.backgroundColor);
		setContentWidthArrState(defaultArticleState.contentWidth);
	};

	const [fontState, setFontState] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeState, setFontSizeState] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColorState, setFontColorState] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColorState, setBackgroundColorState] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidthArrState, setContentWidthArrState] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

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

	useEffect(() => {
		setFontState(fontState);
		setFontSizeState(fontSizeState);
		setFontColorState(fontColorState);
		setBackgroundColorState(backgroundColorState);
		setContentWidthArrState(contentWidthArrState);
	}, [stylesSelected]);

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
		onChange: handleClose,
		rootRef: ref,
	});

	const asideContainerStyle = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

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
						<Button title='Сбросить' type='reset' onClick={handleResetStyles} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
