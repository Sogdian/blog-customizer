import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColorsOptions,
	contentWidthArrOptions,
	defaultArticleState,
	fontColorsOptions,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

type FormStates = {
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
	const { onResetClick, onSubmitClick } = props;

	const [state, setState] = useState(defaultArticleState);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmitClick({
			fontFamily: state.fontFamilyOption.value,
			fontSize: state.fontSizeOption.value,
			fontColor: state.fontColor.value,
			backgroundColor: state.backgroundColor.value,
			contentWidth: state.contentWidth.value,
		});
		setState(state);
	};

	const handleResetStyles = () => {
		onResetClick();
		setState(defaultArticleState);
	};

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
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Open Sans'
						onChange={handleOnChange('fontFamilyOption')}
						title='шрифт'
					/>
					<RadioGroup
						selected={state.fontSizeOption}
						name='fontSize'
						options={fontSizeOptions}
						onChange={handleOnChange('fontSizeOption')}
						title='размер шрифта'
					/>
					<Select
						selected={state.fontColor}
						options={fontColorsOptions}
						placeholder='Черный>'
						onChange={handleOnChange('fontColor')}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColorsOptions}
						placeholder='Белый>'
						onChange={handleOnChange('backgroundColor')}
						title='цвет фона'
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArrOptions}
						placeholder='Широкий'
						onChange={handleOnChange('contentWidth')}
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
