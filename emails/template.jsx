import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

export default function EmailTemplate({
    userName = "User",
    type = "budget-alert",
    data = {
        percentageUsed:0,
        budgetAmount:0,
        totalExpenses:0,
        accountName:"",
    },
}) {
    if (type === "budget-alert") {
        return (
            <Html>
                <Head />
                <Preview>
                    Budget Alert - You’re nearing your spending limit
                </Preview>
                <Tailwind>
                    <Body className="bg-gray-100 font-sans m-0 py-5">
                        <Container className="bg-white rounded-lg p-6 max-w-md mx-auto border border-gray-200">
                            <Heading className="text-[22px] font-bold text-gray-900 text-center mb-4">
                                💰 Budget Alert
                            </Heading>

                            <Text className="text-base mb-2 text-gray-700">
                                Hello <strong>{userName}</strong>,
                            </Text>

                            <Text className="text-sm leading-5 mb-4 text-gray-600">
                                You have used{" "}
                                <strong>
                                    {data?.percentageUsed?.toFixed(1)}%
                                </strong>{" "}
                                of your monthly budget. Please review your
                                spending to avoid going over your limit.
                            </Text>

                            {/* Stats Section */}
                            <Section className="bg-gray-50 rounded-md px-4 py-3 mb-5">
                                <div className="text-center">
                                    <Text className="text-xs text-gray-500 mb-1">
                                        Budget Amount
                                    </Text>
                                    <Text className="text-base font-bold text-gray-900">
                                        ${data?.budgetAmount?.toLocaleString()}
                                    </Text>
                                </div>
                                <div className="text-center">
                                    <Text className="text-xs text-gray-500 mb-1">
                                        Spent Already
                                    </Text>
                                    <Text className="text-base font-bold text-red-600">
                                        ${data?.totalExpenses?.toLocaleString()}
                                    </Text>
                                </div>
                                <div className="text-center">
                                    <Text className="text-xs text-gray-500 mb-1">
                                        Remaining Budget
                                    </Text>
                                    <Text className="text-base font-bold text-green-600">
                                        $
                                        {(
                                            (data?.budgetAmount || 0) -
                                            (data?.totalExpenses || 0)
                                        )?.toLocaleString()}
                                    </Text>
                                </div>
                            </Section>

                            <Button
                                // href="/dashboard"  // Todo
                                className="bg-blue-600 cursor-pointer text-white py-3 px-5 rounded-md text-sm font-semibold no-underline block text-center mt-2">
                                View My Budget
                            </Button>

                            <Text className="text-xs text-gray-400 text-center mt-4">
                                This is an automated alert from Expensio. If you
                                have any questions, please contact our support
                                team.
                            </Text>
                        </Container>
                    </Body>
                </Tailwind>
            </Html>
        );
    }
}
