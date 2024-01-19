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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { CustomButton } from "../common/Button";
import { useDispatch } from "react-redux";
import {addIncome, updateIncome } from "@/services/slices/expense-trackerSlice";
import { RootState } from "@/services/redux-store/store";
import { useAppSelector } from "@/hooks/dispatchSelectHook";
import { IncomeModalProps } from "@/types/Income";
const initialValues = {
  name_type: "",
  amount: 0,
  receivedDate: "",
  category: "Salary",
  description: "",
};
let receivedViaInput=false;
export function IncomeModal({ isOpen, setIsOpen,editId}: IncomeModalProps) {
  const { onClose } = useDisclosure();
  const [receivedVia, setReceivedVia] = React.useState(false);
  const [otherField, setOtherField] = React.useState({
    receivedViaInput: "",
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const incomeData = useAppSelector(
    (state: RootState) => state.expenses.income
  );
  console.log("income Data:",incomeData);
  const IncomeUpdateValue = useAppSelector((state: RootState) =>
  state.expenses.income.filter((item) => item.id === editId)
)[0];
  const validationSchema = Yup.object().shape({
    name_type: Yup.string()
      .required("Name is required")
      .matches(/^\S.*\S$/, "Name cannot contain whitespace or tabs"),
    amount: Yup.number()
      .min(0, "Value cannot be negative")
      .required("Amount is required"),
    recievedDate: Yup.string(),
    category: Yup.string().required(),
    description: Yup.string()
      .matches(/^\S.*\S$/, "Description cannot contain whitespace or tabs")
      .required("Description is required"),
  });
  const handleClose = () => {
    onClose();
    setIsOpen(false);
  };
  const handleOtherFieldInputChange = (e: any) => {
    const { name, value } = e.target;
    setOtherField((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddIncome = (values: any) => {
    if (values) {
      const id = Date.now();
      if (receivedVia) {
        receivedViaInput=true;
        if(otherField.receivedViaInput===""){
          toast({
            position: "top-right",
            description: "Received other Input field can't be empty.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return ;
        }else{
          dispatch(addIncome({...values,id,receivedVaiInput:otherField.receivedViaInput}));
          receivedViaInput=false;
          toast({
            position: "top-right",
            description: "Income added Sucessfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          handleClose();
          return ;
        }
      }
      dispatch(addIncome({ ...values, id }));
      toast({
        position: "top-right",
        description: "Income added Sucessfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      handleClose();
    }
    const id = Date.now();
    dispatch(addIncome({ ...values, id }));
    toast({
      position: "top-right",
      description: "Income added Sucessfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    handleClose();
  };
  
  const handleUpdateIncome = (values: any) => {
    if (editId) {
      if (receivedVia) {
        receivedViaInput=true;
        if(otherField.receivedViaInput===""){
          toast({
            position: "top-right",
            description: "Received other Input field can't be empty.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return ;
        }else{
          dispatch(addIncome({...values,id:editId,receivedVaiInput:otherField.receivedViaInput}));
          receivedViaInput=false;
          toast({
            position: "top-right",
            description: "Income Updated Sucessfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          handleClose();
          return ;
        }
      }
      dispatch(updateIncome({ ...values, id: editId }));
      toast({
        position: "top-right",
        description: "Income updated Sucessfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      handleClose();
    }
  };
  return (
    <>
      <Modal
        size={{ base: "md", sm: "md", lg: "xl" }}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          style={{
            borderRadius: "24px",
            marginBottom: "0px",
            border: "1px solid gray",
            background: "#0d1325",
            color: "white",
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
                  initialValues={IncomeUpdateValue||initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    editId && editId > 1
                      ? handleUpdateIncome(values)
                      : handleAddIncome(values);
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
                            type="text"
                            name="name_type"
                            borderColor={"GrayText"}
                            onChange={handleChange}
                            defaultValue={IncomeUpdateValue?.name_type}
                          />
                          <Text color={"red"}>{errors.name_type}</Text>
                        </InputGroup>
                        <InputGroup size="lg" display={"flex"} gap={"12px"}>
                          <Box width={"50%"}>
                            <FormLabel>Amount (&#8377;)</FormLabel>
                            <Input
                              pr="4.5rem"
                              placeholder="100"
                              onChange={handleChange}
                              type="number"
                              name="amount"
                              min={0}
                              max={300000}
                              borderColor={"GrayText"}
                              defaultValue={IncomeUpdateValue?.amount}
                            />
                            <Text color={"red"}>{errors.amount}</Text>
                          </Box>
                          <Box width={"50%"}>
                            <FormLabel>Received Date</FormLabel>
                            <Input
                              pr="4.5rem"
                              placeholder="10/04/20"
                              type="date"
                              max={new Date().toISOString().split("T")[0]}
                              name="receivedDate"
                              colorScheme="white"
                              gap={"1rem"}
                              borderColor={"GrayText"}
                              required
                              css={`
                                ::-webkit-calendar-picker-indicator {
                                  background:url("/icon-calender-removebg-preview.png")
                                    center/80% no-repeat;
                                }
                              `}
                              onChange={handleChange}
                              defaultValue={IncomeUpdateValue?.receivedDate}
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
                            <Select
                              placeholder=""
                              onChange={(e)=>{
                                handleChange(e);
                                setReceivedVia(e.target.value==='other')
                              }}
                              name="category"
                              borderColor={"GrayText"}
                              defaultValue={IncomeUpdateValue?.category}
                            >
                              <option value="Salary">
                                Salary
                              </option>
                              <option value="Passive Income">
                                Passive Income
                              </option>
                              <option value="Youtube" >Youtube</option>
                              <option value='other'>Other</option>
                            </Select>
                          </Box>
                        </InputGroup>
                        {receivedVia?
                        <Textarea
                            placeholder="Other Medium for receiving payment"
                            onChange={handleOtherFieldInputChange}
                            name="receivedViaInput"
                            borderColor={"GrayText"}
                            defaultValue={IncomeUpdateValue?.receivedVaiInput}
                          />:""}
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
                            borderColor={"GrayText"}
                            defaultValue={IncomeUpdateValue?.description}
                          />
                          <Text color={"red"}>{errors.description}</Text>
                          <Box
                            display={"flex"}
                            gap={"20px"}
                            mt={".5rem"}
                            width={"100%"}
                            justifyContent={"center"}
                          >
                            <CustomButton type="submit" fontSize={"1rem"} bg="white">
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
