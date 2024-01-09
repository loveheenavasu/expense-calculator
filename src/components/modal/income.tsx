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
  useDisclosure
} from "@chakra-ui/react";
import { CommonModalProps } from "../types";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { CustomButton } from "../common/Button";
import { useDispatch} from "react-redux";
import { addExpense, addIncome } from "@/services/slices/expense-trackerSlice";
import { RootState } from "@/services/redux-store/store";
import { useAppSelector } from "@/hooks/dispatchSelectHook";
export default function IncomeModal({ isOpen, setIsOpen }: CommonModalProps) {
  const { onClose } = useDisclosure();
  const dispatch = useDispatch();
  const incomeData = useAppSelector((state: RootState) => state.expenses.income);
  console.log("incomeData", incomeData);
  const initialValues = {
    name_type: "",
    amount:0,
    receivedDate: "",
    category: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name_type: Yup.string()
      .required("Name is required")
      .matches(/^\S.*\S$/, "Name cannot contain whitespace or tabs")
      .required("Name is  required"),
    amount: Yup.number()
    .min(0, "Value cannot be negative")
    .required("Amount is required"),
    recievedDate: Yup.string(),
    category: Yup.string()
      .required(),
    description: Yup.string()
      .matches(/^\S.*\S$/, "Description cannot contain whitespace or tabs")
      .required("Description is required"),
  });
  const handleClose = () => {
    onClose();
    setIsOpen(false);
  };
  const handleAddIncome = (values:any) => {
    console.log(values,":values");
    const id=Date.now()
    dispatch(addIncome({...values,id}));
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
            <Text>Add Income</Text>
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
                      handleAddIncome(values);
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
                          <Box width={'50%'}>
                            <FormLabel>Amount (&#8377;)</FormLabel>
                            <Input
                              pr="4.5rem"
                              placeholder="100"
                              onChange={handleChange}
                              type="number"
                              name="amount"
                              min={0}
                              max={300000}
                            />
                            <Text color={'red'}>{errors.amount}</Text>
                          </Box>
                          <Box width={'50%'}>
                            <FormLabel>Received Date</FormLabel>
                            <Input
                              pr="4.5rem"
                              placeholder="10/04/20"
                              bg={"white"}
                              type="date"
                              name="receivedDate"
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
                          <Box w={"100%"}>
                            <FormLabel>Category</FormLabel>
                            <Select placeholder="" onChange={handleChange} name="category">
                              <option value="Salary">Salary</option>
                              <option value="Passive Income">Passive Income</option>
                              <option value="Youtube">Youtube</option>
                            </Select>
                          </Box>
                          {/* <Box w={"50%"}>
                            <FormLabel>Paid via</FormLabel>
                            <Select placeholder="" onChange={handleChange} name="paidVia">
                              <option value="UPI">UPI</option>
                              <option value="Net Banking">Net Banking</option>
                              <option value="E-Wallet">E-Wallet</option>
                            </Select>
                          </Box> */}
                        </InputGroup>

                        <InputGroup
                          size="lg"
                          display={"flex"}
                          flexDirection={"column"}
                        >
                          <FormLabel>Description </FormLabel>
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
