import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  type ArticleStateType,
} from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isParamsFormOpen, setIsParamsFormOpen] = useState(false);

  const [formState, setFormState] = useState(defaultArticleState);

  const formRef = useRef<HTMLElement>(null);

  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isParamsFormOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      const isOutsideForm = formRef.current && !formRef.current.contains(target);

      const isOutsideButton = buttonRef.current && !buttonRef.current.contains(target);

      if (isOutsideForm && isOutsideButton) {
        setIsParamsFormOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isParamsFormOpen]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onApply(formState);
  };

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <div ref={buttonRef}>
        <ArrowButton
          isOpen={isParamsFormOpen}
          onClick={() => setIsParamsFormOpen(!isParamsFormOpen)}
        />
      </div>

      <aside
        ref={formRef}
        className={clsx(styles.container, { [styles.container_open]: isParamsFormOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <h2 className={styles.title}>Задайте параметры</h2>

          <div className={styles.formGroup}>
            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              onChange={(option) =>
                setFormState({ ...formState, fontFamilyOption: option })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <RadioGroup
              name="fontSize"
              title="Размер шрифта"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={(option) =>
                setFormState({ ...formState, fontSizeOption: option })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={formState.fontColor}
              onChange={(option) => setFormState({ ...formState, fontColor: option })}
            />
          </div>

          <div className={styles.separator}>
            <Separator />
          </div>

          <div className={styles.formGroup}>
            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={formState.backgroundColor}
              onChange={(option) =>
                setFormState({ ...formState, backgroundColor: option })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={(option) => setFormState({ ...formState, contentWidth: option })}
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};

//Храним локально isOpen, Состояние формы, Примененные стили в родительском App
// title: string;
// onClick?: () => void;
// htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
// type: 'apply' | 'clear';
