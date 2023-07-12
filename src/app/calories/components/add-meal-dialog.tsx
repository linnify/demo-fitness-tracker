import { Dialog, DialogContent, DialogHeader } from '@app/components/core/dialog';
import { useEffect, useState } from 'react';
import { Button } from '@app/components/core/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Meal } from '@prisma/client';
import { InputNumberFormField } from '@app/components/form/input.control';
import { Form } from '@app/components/core/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddMealData, addMealSchema } from '@app/lib/meals/validation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@app/components/core/select';
import { SelectPortal, SelectScrollUpButton, SelectViewport } from '@radix-ui/react-select';
import { UserMeal } from '@app/types/user.type';

type InformationDialogProps = {
  title?: string;
  description?: string;
  onClose: () => void;
  children?: React.ReactNode;
};

const AddMealContent = ({ title, description, onClose, children }: InformationDialogProps) => {
  return (
    <DialogContent
      className="flex h-full justify-center gap-0 overflow-y-auto border-none bg-white p-0 sm:max-h-[620px] sm:max-w-[630px]"
      portalClassName={'flex flex-col '}
      onClose={onClose}
    >
      <div className={'flex h-full flex-col justify-between pl-8 pr-8'}>
        <div className={'flex h-full flex-col gap-8 pt-12'}>
          <DialogHeader className={'pr-6'}>
            <h5 className={'font-bold'}>{title}</h5>
          </DialogHeader>
          {!!description && <DialogDescription>{description}</DialogDescription>}

          {children}
        </div>
      </div>
    </DialogContent>
  );
};

const AddMealDialog = (props: { onAddMeal: (meal: UserMeal) => void }) => {
  const { onAddMeal } = props;
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    if (dialogOpened) {
      getMeals();
    }
  }, [dialogOpened]);

  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<AddMealData>({
    resolver: zodResolver(addMealSchema)
  });

  const onSubmit = async (data: AddMealData) => {
    setLoading(true);

    const response = await fetch(`/api/eaten-meals`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    setLoading(false);

    if (!response?.ok) {
      console.log('error');
      return;
    }

    onAddMeal(await response.json());
    setDialogOpened(false);
    form.reset();
  };

  const getMeals = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/meals`, {
      method: 'GET'
    });
    setMeals(await response.json());
    setIsLoading(false);
  };

  return (
    <Dialog open={dialogOpened} modal={true}>
      <Button
        className="foxus:outline-none focus:shadow-outline mb-2 mt-4 rounded bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => setDialogOpened(true)}
      >
        Add Meal
      </Button>
      <AddMealContent
        title={'Add Meal'}
        description={'Add a meal to your daily calories intake'}
        onClose={() => setDialogOpened(false)}
      >
        <Form {...form}>
          <form className="h-full py-10" onSubmit={form.handleSubmit(onSubmit)}>
            <div className={'flex h-full flex-col justify-between'}>
              <div className={'flex flex-col gap-8'}>
                {!isLoading && meals && (
                  <Select
                    onValueChange={(value) => {
                      form.setValue('mealId', +value);
                    }}
                  >
                    <SelectTrigger className={'bg-white'} aria-label="Meal">
                      <SelectValue placeholder="Select a meal…" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectContent className={'bg-white'}>
                        <SelectScrollUpButton />
                        <SelectViewport className={'bg-white'}>
                          {meals.map((meal) => (
                            <SelectItem className={'bg-white'} value={`${meal.id}`} key={meal.id}>
                              {`${meal.name} - ${meal.grams} g `}
                            </SelectItem>
                          ))}
                        </SelectViewport>
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
                <InputNumberFormField
                  control={form.control}
                  name={'mealId'}
                  label={'Meal'}
                  className={'hidden max-w-sm'}
                />
                <InputNumberFormField
                  control={form.control}
                  name={'value'}
                  label={'Amount'}
                  className={'max-w-sm'}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="foxus:outline-none focus:shadow-outline mb-2 mt-4 rounded bg-blue-500 px-8 py-2 font-bold text-white hover:bg-blue-700"
              >
                Add Meal
              </Button>
            </div>
          </form>
        </Form>
      </AddMealContent>
    </Dialog>
  );
};

export default AddMealDialog;
