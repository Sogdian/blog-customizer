import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

interface SelectedStyles {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
}

const App = () => {
	const handleResetStyles = () => {
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

	const handleFormSubmit = (selectedStyles: SelectedStyles) => {
		setStylesSelected(selectedStyles);
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
				stylesSelected={stylesSelected}
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
