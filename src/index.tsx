import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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

	const handleResetStyles = () => {
		setFontState(defaultArticleState.fontFamilyOption);
		setFontSizeState(defaultArticleState.fontSizeOption);
		setFontColorState(defaultArticleState.fontColor);
		setBackgroundColorState(defaultArticleState.backgroundColor);
		setContentWidthArrState(defaultArticleState.contentWidth);

		setStylesSelected({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
	};

	const [stylesSelected, setStylesSelected] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	const handleFormSubmit = () => {
		setStylesSelected({
			fontFamily: fontState.value,
			fontSize: fontSizeState.value,
			fontColor: fontColorState.value,
			backgroundColor: backgroundColorState.value,
			contentWidth: contentWidthArrState.value,
		});
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': stylesSelected.fontFamily,
					'--font-size': stylesSelected.fontSize,
					'--font-color': stylesSelected.fontColor,
					'--container-width': stylesSelected.contentWidth,
					'--bg-color': stylesSelected.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontState={fontState}
				setFontState={setFontState}
				fontSizeState={fontSizeState}
				setFontSizeState={setFontSizeState}
				fontColorState={fontColorState}
				setFontColorState={setFontColorState}
				backgroundColorState={backgroundColorState}
				setBackgroundColorState={setBackgroundColorState}
				contentWidthArrState={contentWidthArrState}
				setContentWidthArrState={setContentWidthArrState}
				onResetClick={handleResetStyles}
				onSubmitClick={handleFormSubmit}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
