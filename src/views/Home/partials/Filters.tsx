import Typography from "@aroma/components/Typography";
import { Form, Input, Select, Slider } from "antd";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { FilterState } from "../Home";

interface FiltersProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
}

function Filters(props: FiltersProps) {
  const { filter, setFilter } = props;

  return (
    <div className="w-full px-4 py-6">
      <Form className="gap-4 flex flex-col">
        <Input
          placeholder="Search"
          prefix={<BiSearch className="w-7 h-7 text-gray-500" />}
          value={filter.keyword}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, keyword: e.target.value }))
          }
        />
        <div className="flex flex-col my-2">
          <Typography as="p" className="font-medium">
            Rating
          </Typography>
          <Slider
            min={0}
            step={0.1}
            max={5}
            value={filter.rating}
            onChange={(value) =>
              setFilter((prev) => ({ ...prev, rating: value }))
            }
          />
        </div>
        <div className="flex gap-x-5">
          <Select
            className="w-full"
            options={[
              { label: "Restaurant", value: "restaurant" },
              { label: "Cafe", value: "cafe" },
            ]}
            value={filter.category}
            placeholder="Kategori"
            onChange={(value) =>
              setFilter((prev) => ({ ...prev, category: value }))
            }
            allowClear
            onClear={() => {
              setFilter((prev) => ({ ...prev, category: "" }))
            }}
          />
        </div>
      </Form>
    </div>
  );
}

export default Filters;
