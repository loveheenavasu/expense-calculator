import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  InputGroup,
  Box,
  Text,
  Stack,
  ModalHeader,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { CustomButton } from "../common/Button";
import {
  addExpense,
  updateExpense,
} from "@/services/slices/expense-trackerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/dispatchSelectHook";
import { RootState } from "@/services/redux-store/store";
import { ExpenseModalProps } from "@/types/Expense";
const initialValues = {
  name_type: "",
  price: 0,
  spendDate: "",
  category: "food",
  paidVia: "upi",
  description: "",
  paidViaInput: "",
  categoryInput: "",
};
let paidViaInput = false;
let categoryInput = false;
export function ExpensesModal({
  isOpen,
  setIsOpen,
  editId,
}: ExpenseModalProps) {
  const expenseUpdateValue = useAppSelector((state: RootState) =>
    state.expenses.expenses.filter((item: any) => item?.id === editId)
  )[0];
  const [category, setCategory] = useState(false);
  const [paidVia, setPaidVia] = useState(false);
  const { onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const validationSchema = Yup.object().shape({
    name_type: Yup.string()
      .matches(/^\S.*\S$/, "Name cannot contain whitespace or tabs")
      .required("Name is required"),
    price: Yup.number()
      .min(0, "Value cannot be negative")
      .required("Price is required"),
    spendDate: Yup.string(),
    category: Yup.string(),
    paidVia: Yup.string().required(),
    description: Yup.string()
      .matches(/^\S.*\S$/, "Description cannot contain whitespace or tabs")
      .required("Decription is Required"),
  });
  const handleClose = () => {
    onClose();
    setIsOpen(false);
  };

  const handleAddExpense = (values: any) => {
    if (values) {
      const id = Date.now();
      if (paidVia && category) {
        paidViaInput = true;
        categoryInput = true;
        if (values.categoryInput === "" && values.paidViaInput === "") {
          toast({
            position: "top-right",
            description: "Category and Paid other Input field can't be empty.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        } else if (values.categoryInput === "" || values.paidViaInput === "") {
          toast({
            position: "top-right",
            description: "Other Input field can't be empty.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        } else {
          dispatch(addExpense({ ...values, id }));
          paidViaInput = false;
          categoryInput = false;
          toast({
            position: "top-right",
            description: "Expenses added with other options you describe.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          handleClose();
          return;
        }
      } else if (paidVia) {
        if (values.paidViaInput === "") {
          toast({
            position: "top-right",
            description: "PaidVia other Input field can't be empty.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        }
      } else if (category) {
        if (values.categoryInput === "") {
          toast({
            position: "top-right",
            description: "Category other Input field can't be empty.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        }
      }
      dispatch(addExpense({ ...values, id }));
      toast({
        position: "top-right",
        description: "Expense added Sucessfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      handleClose();
    }
  };
  const handleUpdateExpense = (values: any) => {
    if (editId) {
      if (values) {
        if (paidVia && category) {
          paidViaInput = true;
          categoryInput = true;
          if (values?.categoryInput === "" && values.paidViaInput === "") {
            toast({
              position: "top-right",
              description:
                "Category and Paid other Input field can't be empty.",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
            return;
          } else if (
            values?.categoryInput === "" ||
            values?.paidViaInput === ""
          ) {
            toast({
              position: "top-right",
              description: "Other Input field can't be empty.",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
            return;
          } else {
            dispatch(updateExpense({ ...values, id: editId }));
            paidViaInput = false;
            categoryInput = false;
            toast({
              position: "top-right",
              description: "Expenses updated with other options you describe.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            handleClose();
            return;
          }
        } else if (paidVia) {
          if (values?.paidViaInput === "") {
            toast({
              position: "top-right",
              description: "PaidVia other Input field can't be empty.",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
            return;
          } else {
            dispatch(updateExpense({ ...values, id: editId }));
            paidViaInput = false;
            categoryInput = false;
            toast({
              position: "top-right",
              description: "Expenses updated with other options you describe.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            handleClose();
            return;
          }
        } else if (category) {
          if (values?.categoryInput === "") {
            toast({
              position: "top-right",
              description: "Category other Input field can't be empty.",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
            return;
          } else {
            dispatch(updateExpense({ ...values, id: editId }));
            paidViaInput = false;
            categoryInput = false;
            toast({
              position: "top-right",
              description: "Expenses updated with other options you describe.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            handleClose();
            return;
          }
        }
      }
      dispatch(updateExpense({ ...values, id: editId }));
      toast({
        position: "top-right",
        description: "Expense updated Sucessfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      handleClose();
      return;
    }
  };
  return (
    <>
      <Modal
        size={{ base: "md", sm: "md", lg: "xl" }}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent
          style={{
            borderRadius: "24px",
            marginBottom: "0px",
            background: "#0d1325",
            color: "white",
            border: "1px solid gray",
          }}
        >
          <ModalCloseButton />
          <ModalHeader>
            <Text>Add Expenses</Text>
          </ModalHeader>
          <ModalBody padding={"20px 30px 0px"} gap={"32px"}>
            <Box
              display={"flex"}
              overflowY={"auto"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "0px",
                },
              }}
              height={"58vh"}
              flexDirection={"column"}
              gap={"32px"}
            >
              <Box>
                <Formik
                  initialValues={expenseUpdateValue || initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    editId && editId > 1
                      ? handleUpdateExpense(values)
                      : handleAddExpense(values);
                  }}
                >
                  {({ handleChange, values, errors }) => (
                    <Form>
                      <Stack spacing={6}>
                        <InputGroup
                          size="lg"
                          display={"flex"}
                          flexDirection={"column"}
                        >
                          <FormLabel>Name</FormLabel>
                          <Input
                            pr="4.5rem"
                            placeholder="Name"
                            type="text"
                            name="name_type"
                            borderColor={"GrayText"}
                            onChange={handleChange}
                            defaultValue={expenseUpdateValue?.name_type}
                          />
                          <Text color={"red"}>{errors.name_type}</Text>
                        </InputGroup>
                        <InputGroup
                          size="lg"
                          display={"flex"}
                          gap={"12px"}
                          width={"100%"}
                        >
                          <Box width={"50%"}>
                            <FormLabel>Price (&#8377;)</FormLabel>
                            <Input
                              pr="4.5rem"
                              placeholder="100"
                              onChange={handleChange}
                              type="number"
                              name="price"
                              min={0}
                              max={300000}
                              borderColor={"GrayText"}
                              defaultValue={expenseUpdateValue?.price}
                            />
                            <Text color={"red"}>{errors.price}</Text>
                          </Box>
                          <Box width="50%">
                            <FormLabel>Spend Date</FormLabel>
                            <InputGroup>
                              <Input
                                pr="4.5rem"
                                placeholder="10/04/2024"
                                type="date"
                                name="spendDate"
                                max={new Date().toISOString().split("T")[0]}
                                borderColor={"GrayText"}
                                required
                                css={`
                                  ::-webkit-calendar-picker-indicator {
                                    background: url("/icon-calender-removebg-preview.png")
                                      center/80% no-repeat;
                                  }
                                `}
                                onChange={handleChange}
                                color={"white"}
                                defaultValue={expenseUpdateValue?.spendDate}
                              />
                            </InputGroup>
                          </Box>
                        </InputGroup>
                        <InputGroup
                          size="lg"
                          display={"flex"}
                          gap={"12px"}
                          w={"100%"}
                        >
                          <Box w={"50%"}>
                            <FormLabel>Category</FormLabel>
                            <Select
                              placeholder=""
                              onChange={(e) => {
                                handleChange(e);
                                setCategory(e.target.value === "other");
                              }}
                              name="category"
                              borderColor={"GrayText"}
                              defaultValue={expenseUpdateValue?.category}
                            >
                              <option value="Food">Food</option>
                              <option value="Grocery">Grocery</option>
                              <option value="Clothes">Clothes</option>
                              <option value="other">Other</option>
                            </Select>
                          </Box>
                          <Box w={"50%"}>
                            <FormLabel>Paid via</FormLabel>
                            <Select
                              placeholder=""
                              onChange={(e) => {
                                handleChange(e);
                                setPaidVia(e.target.value === "other");
                              }}
                              name="paidVia"
                              borderColor={"GrayText"}
                              defaultValue={expenseUpdateValue?.paidVia}
                            >
                              <option value="UPI">UPI</option>
                              <option value="Net Banking">Net Banking</option>
                              <option value="E-Wallet">E-Wallet</option>
                              <option value="other">Other</option>
                            </Select>
                          </Box>
                        </InputGroup>
                        <InputGroup
                          size="lg"
                          display={"flex"}
                          gap={"12px"}
                          w={"100%"}
                        >
                          {category ? (
                            <Textarea
                              placeholder="Type Another Category Here"
                              name="categoryInput"
                              onChange={handleChange}
                              borderColor={"GrayText"}
                              defaultValue={expenseUpdateValue?.categoryInput}
                            />
                          ) : (
                            ""
                          )}
                          {paidVia ? (
                            <Textarea
                              placeholder="Type payment another method Here"
                              name="paidViaInput"
                              onChange={handleChange}
                              borderColor={"GrayText"}
                              defaultValue={expenseUpdateValue?.paidViaInput}
                            />
                          ) : (
                            ""
                          )}
                        </InputGroup>
                        <InputGroup
                          size="lg"
                          display={"flex"}
                          flexDirection={"column"}
                          width={"100%"}
                        >
                          <FormLabel>Description</FormLabel>
                          <Textarea
                            placeholder="Description for Income"
                            onChange={handleChange}
                            name="description"
                            borderColor={"GrayText"}
                            defaultValue={expenseUpdateValue?.description}
                          />
                          <Text color={"red"}>{errors.description}</Text>
                          <Box
                            display={"flex"}
                            gap={"20px"}
                            mt={".5rem"}
                            width={"100%"}
                            justifyContent={"center"}
                          >
                            <CustomButton
                              type="submit"
                              fontSize={"1rem"}
                              bg="white"
                            >
                              {editId && editId > 1 ? "Edit" : "Add"}
                            </CustomButton>
                          </Box>
                        </InputGroup>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
