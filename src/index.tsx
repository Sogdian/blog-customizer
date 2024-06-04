import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
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

	setFontState(fontState); //удалить
	setFontSizeState(fontSizeState); //удалить
	setFontColorState(fontColorState); //удалить
	setBackgroundColorState(backgroundColorState); //удалить
	setContentWidthArrState(contentWidthArrState); //удалить

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
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
				onResetClick={}
				onSubmitClick={}
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
