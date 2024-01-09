import React from "react";
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
  Icon,
  Textarea,
} from "@chakra-ui/react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { CommonModalProps } from "../types";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { CustomButton } from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "@/services/slices/expense-trackerSlice";
import { RootState } from "@/services/redux-store/store";
import { useAppSelector } from "@/hooks/dispatchSelectHook";
export default function ExpensesModal({ isOpen, setIsOpen }: CommonModalProps) {
  const { onClose } = useDisclosure();
  const dispatch = useDispatch();
  const expensesData = useAppSelector((state: RootState) => state.expenses);
  console.log("expensesData", expensesData);
  const initialValues = {
    name_type: "",
    price:0,
    spendDate: "",
    category: "",
    paidVia: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name_type: Yup.string()
      .matches(/^\S.*\S$/, "Name cannot contain whitespace or tabs")
      .required("Name is required"),
    price: Yup.number()
    .min(0, "Value cannot be negative")
    .required('Price is required'),
    spendDate: Yup.string(),
    category: Yup.string()
      .required(),
    paidVia: Yup.string()
      .required(),
    description: Yup.string()
      .matches(/^\S.*\S$/, "Description cannot contain whitespace or tabs")
      .required("Decription is Required"),
  });
  const handleClose = () => {
    onClose();
    setIsOpen(false);
  };
  const handleAddExpense = (values:any) => {
    console.log(values,":values");
    const id=Date.now()
    console.log("id",id)
    dispatch(addExpense({ ...values, id }));
    handleClose();
    console.log("named exit");
  };
  return (
    <>
      <Modal
        size={{ base: "md", sm: "md", lg: "xl" }}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent
          style={{
            borderRadius: "24px",
            marginBottom: "0px",
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
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      console.log('submit fired::');
                      handleAddExpense(values);
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
                            placeholder="First Name"
                            backgroundColor="white"
                            type="text"
                            name="name_type"
                            onChange={handleChange}
                          />
                          <Text color={'red'}>{errors.name_type}</Text>
                        </InputGroup>
                        <InputGroup size="lg" display={"flex"} gap={"12px"}>
                          <Box>
                            <FormLabel>Price (&#8377;)</FormLabel>
                            <Input
                              pr="4.5rem"
                              placeholder="100"
                              onChange={handleChange}
                              type='number'
                              name="price"
                              min={0}
                            />
                            <Text color={'red'}>{errors.price}</Text>
                          </Box>
                          <Box>
                            <FormLabel>Spend Date</FormLabel>
                            <Input
                              pr="4.5rem"
                              placeholder="10/04/20"
                              bg={"white"}
                              type="date"
                              name="spendDate"
                              onChange={handleChange}
                            />
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
                            <Select placeholder="" onChange={handleChange} name="category">
                              <option value="Food">Food</option>
                              <option value="Grocery">Grocery</option>
                              <option value="Clothes">Clothes</option>
                            </Select>
                          </Box>
                          <Box w={"50%"}>
                            <FormLabel>Paid via</FormLabel>
                            <Select placeholder="" onChange={handleChange} name="paidVia">
                              <option value="UPI">UPI</option>
                              <option value="Net Banking">Net Banking</option>
                              <option value="E-Wallet">E-Wallet</option>
                            </Select>
                          </Box>
                        </InputGroup>

                        <InputGroup
                          size="lg"
                          display={"flex"}
                          flexDirection={"column"}
                        >
                          <FormLabel>Description (Optional)</FormLabel>
                          <Textarea
                            placeholder="Description for Income"
                            onChange={handleChange}
                            name="description"
                          />
                          <Text color={'red'}>{errors.description}</Text>
                          <Box
                            display={"flex"}
                            gap={"20px"}
                            mt={".5rem"}
                            width={"100%"}
                            justifyContent={"center"}
                          >
                            {/* <Button type="submit"> Add</Button> */}
                            <CustomButton type="submit" fontSize={"1rem"}>
                              Add
                            </CustomButton>
                          </Box>
                        </InputGroup>
                      </Stack>
                      </Form>
                    )}
                  </Formik>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"20px"}
              ></Box>
            </Box>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
